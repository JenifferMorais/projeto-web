package com.example.web.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.web.model.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>{

}
