package com.vaahan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaahan.entities.Violation;

public interface ViolationRepository extends JpaRepository<Violation, Long> {

}
