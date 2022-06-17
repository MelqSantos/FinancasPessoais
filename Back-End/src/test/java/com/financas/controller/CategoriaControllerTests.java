package com.financas.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financas.model.Usuario;
import com.financas.model.UsuarioLogin;
import com.google.gson.Gson;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CategoriaControllerTests {

	@Autowired
	MockMvc mockMvc;
	
	private ObjectMapper mapper = new ObjectMapper();
	
	static String auth;
	
	private String auth() throws Exception {
		Usuario user = new Usuario();
		user.setEmail("melqsantos96@gmail.com");
		user.setSenha("99598496");
		
		ResultActions response = mockMvc.perform(
				post("/usuario/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapper.writeValueAsString(user)));
		
		String resultStr = response.andReturn().getResponse().getContentAsString();
		
		Gson gson = new Gson();
		UsuarioLogin usuarioLogin = gson.fromJson(resultStr, UsuarioLogin.class);
		String bToken = usuarioLogin.getToken();
		this.setValueToken(bToken);
		
		return bToken;
	}
	
	void setValueToken(String token) {
		auth = token; 
	}
	
	@Test
	void getAllTest() throws Exception{
		
		ResultActions result = mockMvc.perform(
				get("/categoria")
				.contentType(MediaType.APPLICATION_JSON)
				.header(HttpHeaders.AUTHORIZATION, this.auth()));
		
		result.andExpect(status().isOk());
		
	}
}
