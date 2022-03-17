package com.financas.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financas.model.Transacao;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long>{

	public List<Transacao> findByValor(BigDecimal valor);
}
