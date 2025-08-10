package com.vaahan.service;

import java.util.List;

import com.vaahan.entities.User;
import com.vaahan.entities.VCoinConfig;
import com.vaahan.entities.VCoinTransaction;

public interface VCoinService {
    
    /**
     * Award VCoins to a user for an approved violation report
     * @param user The user to award VCoins to
     * @param severityLevel The severity level of the violation
     * @param violationReportId The ID of the violation report
     * @return The transaction record
     */
    VCoinTransaction awardVCoinsForViolationReport(User user, String severityLevel, Long violationReportId);
    
    /**
     * Get VCoin configuration for a severity level
     * @param severityLevel The severity level
     * @return The VCoin configuration
     */
    VCoinConfig getVCoinConfigForSeverity(String severityLevel);
    
    /**
     * Get user's VCoin balance
     * @param userId The user ID
     * @return The current VCoin balance
     */
    int getUserVCoinBalance(Long userId);
    
    /**
     * Get user's VCoin transaction history
     * @param userId The user ID
     * @return List of transactions
     */
    List<VCoinTransaction> getUserTransactionHistory(Long userId);
    
    /**
     * Get all VCoin configurations
     * @return List of all configurations
     */
    List<VCoinConfig> getAllVCoinConfigs();
    
    /**
     * Update VCoin configuration
     * @param config The configuration to update
     * @return The updated configuration
     */
    VCoinConfig updateVCoinConfig(VCoinConfig config);
} 