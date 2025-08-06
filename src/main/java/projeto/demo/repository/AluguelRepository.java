package projeto.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import projeto.demo.model.Aluguel;
import projeto.demo.model.Carro;

import java.util.List;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
	

	@Query("SELECT a FROM Aluguel a WHERE a.carro = ?1 AND a.ativo = true")
	List<Aluguel> findByCarroAndAtivoTrue(Carro carro);
	
 	@Query("SELECT a FROM Aluguel a WHERE a.ativo = true")
	List<Aluguel> findByAtivoTrue();
	

	List<Aluguel> findByNomeClienteContainingIgnoreCase(String nomeCliente);
}