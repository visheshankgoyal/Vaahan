package com.vaahan.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vcoin_config")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VCoinConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private SeverityLevel severityLevel;

    @Column(nullable = false)
    private int vCoinsReward; // VCoins awarded for this severity level

    @Column(length = 500)
    private String description; // Description of the reward

    @Column(nullable = false)
    private boolean isActive = true; // Whether this configuration is active
} 