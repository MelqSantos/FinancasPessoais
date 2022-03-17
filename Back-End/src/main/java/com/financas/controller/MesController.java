package com.financas.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.financas.model.Mes;
import com.financas.repository.MesRepository;

@RestController
@RequestMapping("/mes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MesController {
	
	@Autowired
	private MesRepository mesRepository;
	
	// Buscar todos os meses
	@GetMapping
	public ResponseEntity<List<Mes>> getAll(){
		return ResponseEntity.ok(mesRepository.findAll());
	}
	
	// Buscar mês pelo ID
	@GetMapping("/{id}")
	public ResponseEntity<Mes> getById(@PathVariable long id){
		return mesRepository.findById(id)
		.map(resposta -> ResponseEntity.ok(resposta))
		.orElse(ResponseEntity.notFound().build());
	}
	
	// Postar um mês
	@PostMapping
	public ResponseEntity<Mes> postMes(@Valid @RequestBody Mes mes){
		return ResponseEntity.status(HttpStatus.CREATED).body(mesRepository.save(mes));
	}
	
	// Editar um mês
	@PutMapping
	public ResponseEntity<Mes> putMes(@Valid @RequestBody Mes mes){
		return mesRepository.findById(mes.getId())
		.map(resposta -> {
			return ResponseEntity.ok().body(mesRepository.save(mes));
		})
		.orElse(ResponseEntity.notFound().build());
	}

}
