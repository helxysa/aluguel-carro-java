package projeto.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projeto.demo.model.Aluguel;
import projeto.demo.service.AluguelService;

/**
 * Esse {@link RestController} representa nossa <b>Facade</b>, pois abstrai toda
 * a complexidade de integrações (Banco de Dados H2) em uma
 * interface simples e coesa (API REST) para gerenciamento de aluguéis.
 */
@RestController
@RequestMapping("/api/alugueis")
public class AluguelRestController {

	@Autowired
	private AluguelService aluguelService;

	@GetMapping
	public ResponseEntity<Iterable<Aluguel>> buscarTodos() {
		return ResponseEntity.ok(aluguelService.buscarTodos());
	}

	@GetMapping("/ativos")
	public ResponseEntity<?> buscarAlugueisAtivos() {
		try {
			Iterable<Aluguel> alugueis = aluguelService.buscarAlugueisAtivos();
			return ResponseEntity.ok(alugueis);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok(java.util.Collections.emptyList());
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Aluguel> buscarPorId(@PathVariable Long id) {
		Aluguel aluguel = aluguelService.buscarPorId(id);
		if (aluguel != null) {
			return ResponseEntity.ok(aluguel);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/alugar")
	public ResponseEntity<?> alugarCarro(
			@RequestParam Long carroId,
			@RequestParam String nomeCliente,
			@RequestParam String dataInicio,
			@RequestParam String dataFim) {
		try {
			Aluguel aluguel = aluguelService.alugarCarro(carroId, nomeCliente, dataInicio, dataFim);
			return ResponseEntity.ok(aluguel);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PutMapping("/finalizar/{id}")
	public ResponseEntity<Aluguel> finalizarAluguel(@PathVariable Long id) {
		Aluguel aluguel = aluguelService.finalizarAluguel(id);
		if (aluguel != null) {
			return ResponseEntity.ok(aluguel);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/disponibilidade/{carroId}")
	public ResponseEntity<Boolean> verificarDisponibilidade(@PathVariable Long carroId) {
		Boolean disponivel = aluguelService.verificarDisponibilidade(carroId);
		return ResponseEntity.ok(disponivel);
	}

	@GetMapping("/test")
	public ResponseEntity<String> test() {
		try {
			long count = ((java.util.Collection<?>) aluguelService.buscarTodos()).size();
			long activeCount = ((java.util.Collection<?>) aluguelService.buscarAlugueisAtivos()).size();
			return ResponseEntity.ok("Total aluguéis: " + count + ", Ativos: " + activeCount);
		} catch (Exception e) {
			return ResponseEntity.ok("Erro: " + e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		aluguelService.deletar(id);
		return ResponseEntity.ok().build();
	}
}