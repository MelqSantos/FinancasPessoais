package com.financas.repository.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financas.repository.CustomRepository;
import com.financas.utils.TransacaoUtil;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
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

        var result = convertObjectToList(query.getSingleResult());
        transacao.setValor(result.get(0) != null ? (BigDecimal) result.get(0) : new BigDecimal(0));
        transacao.setQuantidade(((BigInteger) result.get(1)).intValue());

     return transacao;
    }

    public static List<?> convertObjectToList(Object obj) {
        List<?> list = new ArrayList<>();
        if (obj.getClass().isArray()) {
            list = Arrays.asList((Object[])obj);
        } else if (obj instanceof Collection) {
            list = new ArrayList<>((Collection<?>)obj);
        }
        return list;
    }
}
