package com.financas.utils;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SomaUtil {

    private BigDecimal saldo;

    private BigDecimal valorDespesas;

    private BigDecimal valorReceitas;

    private int quantidadeTotal;

    private int quantidadeDespesas;

    private int quantidadeReceitas;
}
