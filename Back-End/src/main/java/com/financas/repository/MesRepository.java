package com.financas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financas.model.Mes;

@Repository
public interface MesRepository extends JpaRepository<Mes, Long>{
	
	public List<Mes> findAllByDescricaoContainingIgnoreCase(String descricao);
}
