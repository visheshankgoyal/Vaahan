package com.vaahan.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vaahan.entities.SeverityLevel;
import com.vaahan.entities.VCoinConfig;

@Repository
public interface VCoinConfigRepository extends JpaRepository<VCoinConfig, Long> {
    
    Optional<VCoinConfig> findBySeverityLevelAndIsActiveTrue(SeverityLevel severityLevel);
    
    Optional<VCoinConfig> findBySeverityLevel(SeverityLevel severityLevel);
} 