package com.example.web.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.web.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
