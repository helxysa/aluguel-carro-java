package projeto.demo.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projeto.demo.model.Carro;
import projeto.demo.repository.CarroRepository;
import projeto.demo.service.CarroService;


@Service
public class CarroServiceImpl implements CarroService {

	@Autowired
	private CarroRepository carroRepository;
	

	@Override
	public Iterable<Carro> buscarTodos() {
		return carroRepository.findAll();
	}

	@Override
	public Carro buscarPorId(Long id) {
		Optional<Carro> carro = carroRepository.findById(id);
		return carro.get();
	}

	@Override
	public void inserir(Carro carro) {
		carroRepository.save(carro);
	}

	@Override
	public void atualizar(Long id, Carro carro) {
		Optional<Carro> carroBd = carroRepository.findById(id);
		if (carroBd.isPresent()) {
			carro.setId(id);
			carroRepository.save(carro);
		}
	}

	@Override
	public void deletar(Long id) {
		carroRepository.deleteById(id);
	}

}
