package projeto.demo.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projeto.demo.model.Aluguel;
import projeto.demo.model.Carro;
import projeto.demo.repository.AluguelRepository;
import projeto.demo.repository.CarroRepository;
import projeto.demo.service.AluguelService;


@Service
public class AluguelServiceImpl implements AluguelService {

	@Autowired
	private AluguelRepository aluguelRepository;
	
	@Autowired
	private CarroRepository carroRepository;
	
	private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@Override
	public Iterable<Aluguel> buscarTodos() {
		return aluguelRepository.findAll();
	}

	@Override
	public Aluguel buscarPorId(Long id) {
		Optional<Aluguel> aluguel = aluguelRepository.findById(id);
		return aluguel.orElse(null);
	}

	@Override
	public Aluguel alugarCarro(Long carroId, String nomeCliente, String dataInicio, String dataFim) throws Exception {
		Optional<Carro> carroOpt = carroRepository.findById(carroId);
		if (!carroOpt.isPresent()) {
			throw new Exception("Carro não encontrado");
		}
		
		Carro carro = carroOpt.get();
		
		if (!carro.getDisponivel()) {
			throw new Exception("Carro não está disponível para aluguel");
		}
		
		if (!verificarDisponibilidade(carroId)) {
			throw new Exception("Carro já está alugado");
		}
		
		LocalDate inicio = LocalDate.parse(dataInicio, dateFormatter);
		LocalDate fim = LocalDate.parse(dataFim, dateFormatter);
		
		if (inicio.isBefore(LocalDate.now())) {
			throw new Exception("Data de início não pode ser no passado");
		}
		
		if (fim.isBefore(inicio)) {
			throw new Exception("Data de fim deve ser posterior à data de início");
		}
		
		long dias = ChronoUnit.DAYS.between(inicio, fim) + 1;
		double valorPorDia = calcularValorPorDia(carro);
		double valorTotal = dias * valorPorDia;
		
		Aluguel aluguel = new Aluguel();
		aluguel.setCarro(carro);
		aluguel.setNomeCliente(nomeCliente);
		aluguel.setDataInicio(inicio);
		aluguel.setDataFim(fim);
		aluguel.setValorPorDia(valorPorDia);
		aluguel.setValorTotal(valorTotal);
		aluguel.setAtivo(true);
		
		carro.setDisponivel(false);
		carroRepository.save(carro);
		
		return aluguelRepository.save(aluguel);
	}

	@Override
	public Aluguel finalizarAluguel(Long aluguelId) {
		Optional<Aluguel> aluguelOpt = aluguelRepository.findById(aluguelId);
		if (aluguelOpt.isPresent()) {
			Aluguel aluguel = aluguelOpt.get();
			aluguel.setAtivo(false);
			
			Carro carro = aluguel.getCarro();
			carro.setDisponivel(true);
			carroRepository.save(carro);
			
			return aluguelRepository.save(aluguel);
		}
		return null;
	}

	@Override
	public Boolean verificarDisponibilidade(Long carroId) {
		Optional<Carro> carroOpt = carroRepository.findById(carroId);
		if (carroOpt.isPresent()) {
			Carro carro = carroOpt.get();
			return aluguelRepository.findByCarroAndAtivoTrue(carro).isEmpty();
		}
		return false;
	}

	@Override
	public Iterable<Aluguel> buscarAlugueisAtivos() {
		try {
			return aluguelRepository.findByAtivoTrue();
		} catch (Exception e) {
			System.err.println("Erro ao buscar aluguéis ativos: " + e.getMessage());
			e.printStackTrace();
			return java.util.Collections.emptyList();
		}
	}

	@Override
	public void deletar(Long id) {
		Optional<Aluguel> aluguelOpt = aluguelRepository.findById(id);
		if (aluguelOpt.isPresent()) {
			Aluguel aluguel = aluguelOpt.get();
			if (aluguel.getAtivo()) {
				finalizarAluguel(id);
			}
		}
		aluguelRepository.deleteById(id);
	}
	
	private double calcularValorPorDia(Carro carro) {
		return carro.getValor() * 0.005;
	}
}