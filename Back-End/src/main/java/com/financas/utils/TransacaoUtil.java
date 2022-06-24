package com.financas.utils;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransacaoUtil {

	private BigDecimal valor;
	private int quantidade;
}
