package com.financas.repository;

import java.math.BigDecimal;
import java.util.List;

import com.financas.utils.TransacaoUtil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.financas.model.Transacao;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long>{

	public List<Transacao> findByValor(BigDecimal valor);
	
	public List<Transacao> findByUsuario_idAndMes_id(Long userId,  Long mesId);
	
//	@Query("select sum(t.valor) valor, count(t) " +
//			"from Transacao as t where t.usuario.id = :userId "
//			+ "and t.mes.id = :mesId "
//			+ "and t.tipo = :tipo")
//	public TransacaoUtil getTotalTransacoes(@Param("userId") Long userId, @Param("mesId") Long mesId, @Param("tipo") String tipo);

//	@Query(value = "select sum(valor) valor, count(*) " +
//			"from tb_transacao as t where t.usuario_id = :userId "
//			+ "and t.mes_id = :mesId "
//			+ "and t.tipo = :tipo", nativeQuery = true)
//	public TransacaoUtil getTotalTransacoes(@Param("userId") Long userId, @Param("mesId") Long mesId, @Param("tipo") String tipo);
}
