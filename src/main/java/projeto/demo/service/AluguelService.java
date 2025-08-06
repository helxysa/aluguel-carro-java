package projeto.demo.service;

import projeto.demo.model.Aluguel;


public interface AluguelService {

	Iterable<Aluguel> buscarTodos();

	Aluguel buscarPorId(Long id);

	Aluguel alugarCarro(Long carroId, String nomeCliente, String dataInicio, String dataFim) throws Exception;

	Aluguel finalizarAluguel(Long aluguelId);

	Boolean verificarDisponibilidade(Long carroId);

	Iterable<Aluguel> buscarAlugueisAtivos();

	void deletar(Long id);
}