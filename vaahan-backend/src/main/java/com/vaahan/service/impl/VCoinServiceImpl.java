package com.vaahan.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vaahan.entities.SeverityLevel;
import com.vaahan.entities.User;
import com.vaahan.entities.VCoinConfig;
import com.vaahan.entities.VCoinTransaction;
import com.vaahan.entities.ViolationReport;
import com.vaahan.exception.ResourceNotFoundException;
import com.vaahan.repository.UserRepository;
import com.vaahan.repository.VCoinConfigRepository;
import com.vaahan.repository.VCoinTransactionRepository;
import com.vaahan.repository.ViolationReportRepository;
import com.vaahan.service.VCoinService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class VCoinServiceImpl implements VCoinService {

    @Autowired
    private VCoinConfigRepository vCoinConfigRepository;

    @Autowired
    private VCoinTransactionRepository vCoinTransactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ViolationReportRepository violationReportRepository;

    @Override
    @Transactional
    public VCoinTransaction awardVCoinsForViolationReport(User user, String severityLevel, Long violationReportId) {
        log.info("Awarding VCoins to user {} for violation report {} with severity {}", 
                user.getUsername(), violationReportId, severityLevel);

        try {
            // Get VCoin configuration for the severity level
            SeverityLevel level = SeverityLevel.valueOf(severityLevel.toUpperCase());
            VCoinConfig config = vCoinConfigRepository.findBySeverityLevelAndIsActiveTrue(level)
                    .orElseThrow(() -> new ResourceNotFoundException("VCoinConfig", "severityLevel", severityLevel));

            // Get the violation report
            ViolationReport violationReport = violationReportRepository.findById(violationReportId)
                    .orElseThrow(() -> new ResourceNotFoundException("ViolationReport", "id", violationReportId));

            // Award VCoins to user
            int vCoinsToAward = config.getVCoinsReward();
            user.addVCoins(vCoinsToAward);
            userRepository.save(user);

            // Create transaction record
            VCoinTransaction transaction = VCoinTransaction.builder()
                    .user(user)
                    .transactionType(VCoinTransaction.TransactionType.EARNED_FROM_VIOLATION_REPORT)
                    .amount(vCoinsToAward)
                    .balanceAfter(user.getVCoins())
                    .description("Earned " + vCoinsToAward + " VCoins for approved violation report (Severity: " + severityLevel + ")")
                    .violationReport(violationReport)
                    .build();

            VCoinTransaction savedTransaction = vCoinTransactionRepository.save(transaction);

            log.info("Successfully awarded {} VCoins to user {} for violation report {}", 
                    vCoinsToAward, user.getUsername(), violationReportId);

            return savedTransaction;

        } catch (Exception e) {
            log.error("Error awarding VCoins to user {} for violation report {}: {}", 
                    user.getUsername(), violationReportId, e.getMessage(), e);
            throw new RuntimeException("Failed to award VCoins", e);
        }
    }

    @Override
    public VCoinConfig getVCoinConfigForSeverity(String severityLevel) {
        log.debug("Getting VCoin config for severity level: {}", severityLevel);
        
        try {
            SeverityLevel level = SeverityLevel.valueOf(severityLevel.toUpperCase());
            return vCoinConfigRepository.findBySeverityLevelAndIsActiveTrue(level)
                    .orElseThrow(() -> new ResourceNotFoundException("VCoinConfig", "severityLevel", severityLevel));
        } catch (IllegalArgumentException e) {
            log.error("Invalid severity level: {}", severityLevel);
            throw new IllegalArgumentException("Invalid severity level: " + severityLevel);
        }
    }

    @Override
    public int getUserVCoinBalance(Long userId) {
        log.debug("Getting VCoin balance for user: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        return user.getVCoins();
    }

    @Override
    public List<VCoinTransaction> getUserTransactionHistory(Long userId) {
        log.info("Getting VCoin transaction history for user: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        return vCoinTransactionRepository.findByUserOrderByTransactionDateDesc(user);
    }

    @Override
    public List<VCoinConfig> getAllVCoinConfigs() {
        log.debug("Getting all VCoin configurations");
        return vCoinConfigRepository.findAll();
    }

    @Override
    @Transactional
    public VCoinConfig updateVCoinConfig(VCoinConfig config) {
        log.info("Updating VCoin config for severity level: {}", config.getSeverityLevel());
        
        if (config.getId() == null) {
            throw new IllegalArgumentException("VCoin config ID is required for update");
        }
        
        VCoinConfig existingConfig = vCoinConfigRepository.findById(config.getId())
                .orElseThrow(() -> new ResourceNotFoundException("VCoinConfig", "id", config.getId()));
        
        existingConfig.setVCoinsReward(config.getVCoinsReward());
        existingConfig.setDescription(config.getDescription());
        existingConfig.setActive(config.isActive());
        
        VCoinConfig savedConfig = vCoinConfigRepository.save(existingConfig);
        log.info("Successfully updated VCoin config for severity level: {}", savedConfig.getSeverityLevel());
        
        return savedConfig;
    }
} 