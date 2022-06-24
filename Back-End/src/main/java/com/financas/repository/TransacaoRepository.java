package com.financas.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.financas.model.Transacao;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long>{

	public List<Transacao> findByValor(BigDecimal valor);
	
	public List<Transacao> findByUsuario_idAndMes_id(Long userId,  Long mesId);
	
	@Query("select t from Transacao as t where t.usuario.id = :userId"
			+ " and t.mes.id = :mesId"
			+ " and t.tipo = :tipo")
	public List<Transacao> getTotalTransacoes(@Param("userId") Long userId, @Param("mesId") Long mesId, @Param("tipo") String tipo);
}
