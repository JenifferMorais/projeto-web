package com.example.web.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.web.model.entity.Usuario;
import com.example.web.model.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
public class UsuarioController {

	@Autowired
	UsuarioRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario salvar(@RequestBody @Valid Usuario usuario) {
		return repository.save(usuario);
	}

	@GetMapping("{id}")
	public Usuario buscarPorId(@PathVariable Integer id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário com ID " + id + " não encontrado"));
	}

	@DeleteMapping("{id}")
	public void deletar(@PathVariable Integer id) {
		Usuario usuario = repository.findById(id)
		            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário com ID " + id + " não encontrado"));
		  repository.delete(usuario);
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Usuario atualizar(@RequestBody @Valid Usuario usuarioAtualizado, @PathVariable Integer id) {
		repository.findById(id).map(usuario -> {
			usuario.setId(id);
			usuario.setUsername(usuarioAtualizado.getUsername());
			usuario.setPassword(usuarioAtualizado.getPassword());
			return repository.save(usuario);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado"));
		return null;
	}
	
	@GetMapping()
	public List<Usuario> buscar() {
		return repository.findAll();
	}

}
