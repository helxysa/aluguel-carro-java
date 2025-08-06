package projeto.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projeto.demo.model.Carro;
import projeto.demo.service.CarroService;

/**
 * Esse {@link RestController} representa nossa <b>Facade</b>, pois abstrai toda
 * a complexidade de integrações (Banco de Dados H2) em uma
 * interface simples e coesa (API REST).
 */
@RestController
@RequestMapping("/api/carros")
public class CarroRestController {

	@Autowired
	private CarroService carroService;

	@GetMapping
	public ResponseEntity<Iterable<Carro>> buscarTodos() {
		return ResponseEntity.ok(carroService.buscarTodos());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Carro> buscarPorId(@PathVariable Long id) {
		return ResponseEntity.ok(carroService.buscarPorId(id));
	}

	@PostMapping
	public ResponseEntity<Carro> inserir(@RequestBody Carro carro) {
		carroService.inserir(carro);
		return ResponseEntity.ok(carro);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Carro> atualizar(@PathVariable Long id, @RequestBody Carro carro) {
		carroService.atualizar(id, carro);
		return ResponseEntity.ok(carro);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		carroService.deletar(id);
		return ResponseEntity.ok().build();
	}
}
