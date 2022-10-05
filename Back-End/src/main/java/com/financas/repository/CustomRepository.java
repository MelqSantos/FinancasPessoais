package com.financas.repository;

import com.financas.utils.TransacaoUtil;
import org.springframework.stereotype.Repository;
@Repository
public interface CustomRepository {

    TransacaoUtil getTotalTransacoes(Long userId , Long mesId, String tipo);
}
