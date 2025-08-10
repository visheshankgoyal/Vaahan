package com.vaahan.service.impl;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vaahan.entities.Otp;
import com.vaahan.repository.OtpRepository;
import com.vaahan.service.EmailService;
import com.vaahan.service.OtpService;

@Service
public class OtpServiceImpl implements OtpService {

    @Autowired
    private OtpRepository otpRepository;
    
    @Autowired
    private EmailService emailService;

    private static final int OTP_EXPIRATION_MINUTES = 5;

    @Override
    public void generateOtp(String username) {
        String otpCode = String.valueOf(new Random().nextInt(900000) + 100000);
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(OTP_EXPIRATION_MINUTES);

        Otp otp = new Otp();
        otp.setUsername(username);
        otp.setOtpCode(otpCode);
        otp.setExpirationTime(expirationTime);
        otp.setVerified(false);

        otpRepository.save(otp);

        // ✅ Send via email
        emailService.sendOtpEmail(username, otpCode);
    }

    @Override
    public boolean verifyOtp(String username, String otpCode) {
        return otpRepository.findByUsernameAndOtpCode(username, otpCode)
                .filter(o -> o.getExpirationTime().isAfter(LocalDateTime.now()) && !o.isVerified())
                .map(o -> {
                    o.setVerified(true);
                    otpRepository.save(o);
                    return true;
                }).orElse(false);
    }
}
