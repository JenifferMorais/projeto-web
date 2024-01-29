package com.example.web.model.DTO;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServicoPrestadoDTO {

	@NotEmpty(message = "{campo.descricao.obrigatorio}")
	private String descricao;
	
	@NotEmpty(message = "{campo.preco.obrigatorio}")
	private String valor;
	
	@NotEmpty(message = "{campo.data.obrigatorio}")
	private String data;
	
	@NotNull(message = "{campo.cliente.obrigatorio}")
	private Integer idCliente;

}
