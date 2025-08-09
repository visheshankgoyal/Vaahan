package com.vaahan.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vcoin_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VCoinTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType transactionType;

    @Column(nullable = false)
    private int amount; // Positive for earning, negative for spending

    @Column(nullable = false)
    private int balanceAfter; // User's balance after this transaction

    @Column(length = 500)
    private String description; // Description of the transaction

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "violation_report_id")
    private ViolationReport violationReport; // Reference to the report if earned from violation

    @Builder.Default
    private LocalDateTime transactionDate = LocalDateTime.now();

    // Transaction types
    public enum TransactionType {
        EARNED_FROM_VIOLATION_REPORT, // Earned VCoins from approved violation report
        SPENT_ON_REWARDS,            // Spent VCoins on rewards/redemptions
        BONUS_AWARD,                 // Bonus VCoins (promotions, etc.)
        PENALTY_DEDUCTION,           // Penalty deduction
        ADMIN_ADJUSTMENT             // Manual adjustment by admin
    }
} 