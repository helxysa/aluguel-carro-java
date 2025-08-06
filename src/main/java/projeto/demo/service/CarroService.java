package projeto.demo.service;

import projeto.demo.model.Carro;


public interface CarroService {

	Iterable<Carro> buscarTodos();

	Carro buscarPorId(Long id);

	void inserir(Carro carro);

	void atualizar(Long id, Carro carro);

	void deletar(Long id);

}