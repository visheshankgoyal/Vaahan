package com.vaahan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vaahan.entities.User;
import com.vaahan.entities.VCoinTransaction;

@Repository
public interface VCoinTransactionRepository extends JpaRepository<VCoinTransaction, Long> {
    
    List<VCoinTransaction> findByUserOrderByTransactionDateDesc(User user);
    
    List<VCoinTransaction> findByUserAndTransactionTypeOrderByTransactionDateDesc(User user, VCoinTransaction.TransactionType transactionType);
} 