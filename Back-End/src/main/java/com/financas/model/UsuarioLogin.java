package com.financas.model;

import lombok.Data;

@Data
public class UsuarioLogin {

	private long id;
	private String nome, email, senha, foto, token;
	
}
