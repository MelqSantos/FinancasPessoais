package com.financas.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name = "tb_transacao")
public class Transacao {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank(message = "O atributo Descrição é obrigatório!")
	private String descricao;
	
	@NotNull(message = "O atributo valor não pode estar vazio.")
	@DecimalMax(value = "999999.99", message = "O valor máximo permitido é: 999999.99")
	private BigDecimal valor;
	
	@NotBlank(message = "O atributo Tipo é obrigatório!")
	private String tipo;
	
	private LocalDateTime data = LocalDateTime.now();
	
	/* --------- Relacionamento entre as tabelas --------- */
	
	@ManyToOne
	@JsonIgnoreProperties("transacao")
	private Usuario usuario;
	
	@ManyToOne
	@JsonIgnoreProperties("transacao")
	private Categoria categoria;
	
	@ManyToOne
	@JsonIgnoreProperties("transacao")
	private Mes mes;
	
}
