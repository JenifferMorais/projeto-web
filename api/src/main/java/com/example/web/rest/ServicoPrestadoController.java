package com.example.web.rest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.web.model.DTO.ServicoPrestadoDTO;
import com.example.web.model.entity.Cliente;
import com.example.web.model.entity.ServicoPrestado;
import com.example.web.model.repository.ClienteRepository;
import com.example.web.model.repository.ServicoPrestadoRepository;
import com.example.web.util.BigDecimalConverter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/servicos-prestados")
public class ServicoPrestadoController {

	private final ClienteRepository clienteRepository;
	private final ServicoPrestadoRepository repository;
	private final BigDecimalConverter bigDecimalConverter;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ServicoPrestado salvar(@Valid @RequestBody ServicoPrestadoDTO dto) {
		LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
		Integer idCliente = dto.getIdCliente();

		Cliente cliente = clienteRepository.findById(idCliente)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente inexistente."));

		ServicoPrestado servicoPrestado = new ServicoPrestado();
		servicoPrestado.setDescricao(dto.getDescricao());
		servicoPrestado.setData(data);
		servicoPrestado.setCliente(cliente);
		servicoPrestado.setValor(bigDecimalConverter.converter(dto.getValor()));

		return repository.save(servicoPrestado);
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ServicoPrestado atualizar(@Valid @RequestBody ServicoPrestado servicoAtualizado, @PathVariable Integer id) {
		Integer idCliente = servicoAtualizado.getCliente().getId();
		
		repository.findById(id).map(servico -> {
			servico.setId(id);
			servico.setCliente(servicoAtualizado.getCliente());
			servico.setData(servicoAtualizado.getData());
			servico.setDescricao(servicoAtualizado.getDescricao());
			servico.setValor(servicoAtualizado.getValor());
			return repository.save(servico);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Serviço prestado não encontrado"));
		return null;
	}
	
	@GetMapping
	public List<ServicoPrestado> pesquisar(
			@RequestParam(value = "nome", required = false, defaultValue = " ") String nome,
			@RequestParam(value = "mes", required = false) Integer mes) {
		return repository.findByNomeClienteAndMes("%" + nome + "%", mes);
	}

	@GetMapping("/listar")
	public List<ServicoPrestado> buscar() {
		return repository.findAll();
	}
	
	@GetMapping("{id}")
	public ServicoPrestado buscarPorId(@PathVariable Integer id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Serviço prestado com ID " + id + " não encontrado"));
	}

	@DeleteMapping("{id}")
	public void deletar(@PathVariable Integer id) {
		ServicoPrestado prestador = repository.findById(id)
		            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço prestado com ID " + id + " não encontrado"));
		  repository.delete(prestador);
	}
	

}
