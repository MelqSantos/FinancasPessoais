package com.financas.utils;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransacaoUtil implements Serializable {

	private BigDecimal valor;
	private int quantidade;
}
