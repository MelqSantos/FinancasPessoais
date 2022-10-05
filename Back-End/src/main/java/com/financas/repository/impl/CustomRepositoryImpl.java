package com.financas.repository.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financas.model.Transacao;
import com.financas.repository.CustomRepository;
import com.financas.utils.TransacaoUtil;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Repository
public class CustomRepositoryImpl implements CustomRepository{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public TransacaoUtil getTotalTransacoes(Long userId, Long mesId, String tipo) {

        TransacaoUtil transacao = new TransacaoUtil();
        ObjectMapper map = new ObjectMapper();

        Query query = entityManager.createNativeQuery(
        "select sum(valor) valor, count(*) quantidade" +
                " from tb_transacao t where t.usuario_id = " + userId +
                " and t.mes_id = " + mesId +
                " and t.tipo = '" + tipo + "'");

        var result = Arrays.asList(query.getResultList().get(0));

//        transacao.setValor((BigDecimal) result.get(0));
//        transacao.setQuantidade((Integer) result.get(1));

     return transacao;
    }
}
