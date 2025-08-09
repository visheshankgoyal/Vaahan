package com.vaahan.service;

public interface OtpService {
    void generateOtp(String username);
    boolean verifyOtp(String username, String otpCode);
}
