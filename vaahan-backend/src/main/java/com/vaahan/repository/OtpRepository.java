package com.vaahan.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaahan.entities.Otp;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByUsernameAndOtpCode(String username, String otpCode);
    Optional<Otp> findTopByUsernameOrderByExpirationTimeDesc(String username);
}
