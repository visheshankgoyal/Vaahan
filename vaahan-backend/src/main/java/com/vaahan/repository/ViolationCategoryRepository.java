package com.vaahan.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.vaahan.entities.ViolationCategory;

public interface ViolationCategoryRepository extends JpaRepository<ViolationCategory, Long> {
}

