package com.vaahan.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.vaahan.entities.SeverityLevel;
import com.vaahan.entities.VCoinConfig;
import com.vaahan.repository.VCoinConfigRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class VCoinDataInitializer implements CommandLineRunner {

    @Autowired
    private VCoinConfigRepository vCoinConfigRepository;

    @Override
    public void run(String... args) throws Exception {
        log.info("Initializing VCoin configurations...");
        
        // Initialize VCoin configurations for each severity level
        initializeVCoinConfig(SeverityLevel.Low, 10, "Minor traffic violations - 10 VCoins");
        initializeVCoinConfig(SeverityLevel.Medium, 25, "Moderate traffic violations - 25 VCoins");
        initializeVCoinConfig(SeverityLevel.High, 50, "Major traffic violations - 50 VCoins");
        initializeVCoinConfig(SeverityLevel.Extreme, 100, "Critical traffic violations - 100 VCoins");
        
        log.info("VCoin configurations initialized successfully");
    }

    private void initializeVCoinConfig(SeverityLevel severityLevel, int vCoinsReward, String description) {
        if (!vCoinConfigRepository.findBySeverityLevel(severityLevel).isPresent()) {
            VCoinConfig config = VCoinConfig.builder()
                    .severityLevel(severityLevel)
                    .vCoinsReward(vCoinsReward)
                    .description(description)
                    .isActive(true)
                    .build();
            
            vCoinConfigRepository.save(config);
            log.info("Created VCoin config for {}: {} VCoins", severityLevel, vCoinsReward);
        } else {
            log.debug("VCoin config for {} already exists", severityLevel);
        }
    }
} 