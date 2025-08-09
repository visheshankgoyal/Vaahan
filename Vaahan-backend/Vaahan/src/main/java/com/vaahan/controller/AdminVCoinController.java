package com.vaahan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.entities.VCoinConfig;
import com.vaahan.service.VCoinService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/admin/vcoins")
@Slf4j
public class AdminVCoinController {

    @Autowired
    private VCoinService vCoinService;

    @GetMapping("/configs")
    public ResponseEntity<ApiResponse<List<VCoinConfig>>> getAllVCoinConfigs() {
        log.info("Admin requesting all VCoin configurations");
        
        try {
            List<VCoinConfig> configs = vCoinService.getAllVCoinConfigs();
            log.info("Retrieved {} VCoin configurations", configs.size());
            return ResponseEntity.ok(ApiResponse.success("VCoin configurations retrieved successfully", configs));
            
        } catch (Exception e) {
            log.error("Error retrieving VCoin configurations: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve VCoin configurations. Please try again later."));
        }
    }

    @PutMapping("/configs")
    public ResponseEntity<ApiResponse<VCoinConfig>> updateVCoinConfig(@Valid @RequestBody VCoinConfig config) {
        log.info("Admin updating VCoin config for severity level: {}", config.getSeverityLevel());
        
        try {
            VCoinConfig updatedConfig = vCoinService.updateVCoinConfig(config);
            log.info("Successfully updated VCoin config for severity level: {}", updatedConfig.getSeverityLevel());
            return ResponseEntity.ok(ApiResponse.success("VCoin configuration updated successfully", updatedConfig));
            
        } catch (Exception e) {
            log.error("Error updating VCoin config: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to update VCoin configuration. Please try again later."));
        }
    }
} 