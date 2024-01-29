package com.example.web.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import com.example.web.exception.ApiErros;

@RestControllerAdvice
public class ApplicationControllerAdvice {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ApiErros handleValidationErros(MethodArgumentNotValidException ex) {
		BindingResult bindingResult = ex.getBindingResult();
		List<String> messages = bindingResult.getAllErrors().stream()
				.map(objectError -> objectError.getDefaultMessage()).collect(Collectors.toList());
		return new ApiErros(messages);
	}

	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<ApiErros> handleResponseStatusException(ResponseStatusException ex) {
		String mensagemErro = ex.getMessage();
		HttpStatus codigoStatus = ex.getStatus();
		ApiErros apiErros = new ApiErros(mensagemErro);
		return new ResponseEntity<ApiErros>(apiErros, codigoStatus);
	}

}
