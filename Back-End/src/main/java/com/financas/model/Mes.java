package com.financas.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name = "tb_mes")
public class Mes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "O atributo descrição é Obrigatório!")
	private String descricao;
	
	/* --------- Relacionamento entre as tabelas --------- */
	
	@OneToMany(mappedBy = "mes", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties("mes")
	private List<Transacao> transacao;

}
