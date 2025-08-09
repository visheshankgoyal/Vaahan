package com.vaahan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.entities.VCoinTransaction;
import com.vaahan.service.VCoinService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/vcoins")
@Slf4j
public class VCoinController {

    @Autowired
    private VCoinService vCoinService;

    @GetMapping("/balance/{userId}")
    public ResponseEntity<ApiResponse<Integer>> getUserVCoinBalance(@PathVariable Long userId) {
        log.info("User {} requesting VCoin balance", userId);
        
        try {
            int balance = vCoinService.getUserVCoinBalance(userId);
            log.info("User {} VCoin balance: {}", userId, balance);
            return ResponseEntity.ok(ApiResponse.success("VCoin balance retrieved successfully", balance));
            
        } catch (Exception e) {
            log.error("Error retrieving VCoin balance for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve VCoin balance. Please try again later."));
        }
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<ApiResponse<List<VCoinTransaction>>> getUserTransactionHistory(@PathVariable Long userId) {
        log.info("User {} requesting VCoin transaction history", userId);
        
        try {
            List<VCoinTransaction> transactions = vCoinService.getUserTransactionHistory(userId);
            log.info("Retrieved {} transactions for user {}", transactions.size(), userId);
            return ResponseEntity.ok(ApiResponse.success("Transaction history retrieved successfully", transactions));
            
        } catch (Exception e) {
            log.error("Error retrieving transaction history for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve transaction history. Please try again later."));
        }
    }
} 