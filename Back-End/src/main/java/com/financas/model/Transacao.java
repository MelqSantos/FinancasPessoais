package com.financas.model;

import java.math.BigDecimal;

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
	
	/* --------- Getters and Setters --------- */

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public Mes getMes() {
		return mes;
	}

	public void setMes(Mes mes) {
		this.mes = mes;
	}
	
}
