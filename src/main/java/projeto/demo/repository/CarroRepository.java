package projeto.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import projeto.demo.model.Carro;

@Repository
public interface CarroRepository extends CrudRepository<Carro, Long> {

}