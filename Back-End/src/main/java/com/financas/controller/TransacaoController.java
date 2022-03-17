package com.financas.controller;

import java.math.BigDecimal;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.financas.model.Transacao;
import com.financas.repository.TransacaoRepository;

@RestController
@RequestMapping("/transacao")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TransacaoController {
	
	@Autowired
	private TransacaoRepository transacaoRepository;
	
	// Buscar todas as despesas
	@GetMapping
	public ResponseEntity<List<Transacao>> getAll(){
		return ResponseEntity.ok(transacaoRepository.findAll());
	}
	
	// Buscar transacao pelo ID
	@GetMapping("/{id}")
	public ResponseEntity <Transacao> getById(@PathVariable Long id){
		return transacaoRepository.findById(id)
			.map(resp -> ResponseEntity.ok(resp))
			.orElse(ResponseEntity.notFound().build());
	}
	
	// Buscar transacao pelo valor
	@GetMapping("/valor/{valor}")
	public ResponseEntity<List<Transacao>> getByValor(@PathVariable BigDecimal valor){
		return ResponseEntity.ok(transacaoRepository.findByValor(valor));
	}
	
	// Postar uma nova transacao
	@PostMapping
	public ResponseEntity<Transacao> postTransacao(@Valid @RequestBody Transacao transacao){
		return ResponseEntity.status(HttpStatus.CREATED).body(transacaoRepository.save(transacao));
	}
	
	// Alterar uma transacao existente
	@PutMapping
	public ResponseEntity<Transacao> putTransacao(@Valid @RequestBody Transacao transacao){
		return transacaoRepository.findById(transacao.getId())
		.map(resposta -> ResponseEntity.ok().body(transacaoRepository.save(transacao)))
		.orElse(ResponseEntity.notFound().build());
	}
	
	// Deletar transacao
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTransacao(@PathVariable long id){
		return transacaoRepository.findById(id)
		.map(resposta -> {
			transacaoRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		})
		.orElse(ResponseEntity.notFound().build());
	}

}
