package com.vaahan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.vaahan.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.vaahan.repository.OtpRepository;
import com.vaahan.entities.Otp;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private OtpRepository otpRepository;

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Override
    public String fetchOtpForUser(String username) {
        // Fetch the latest OTP for the user (for demo/testing)
        return otpRepository.findTopByUsernameOrderByExpirationTimeDesc(username)
                .map(Otp::getOtpCode)
                .orElse(null);
    }

    @Override
    public void sendOtpEmail(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Your OTP for Vaahan Registration");
            message.setText("Your OTP is: " + otp + ". It will expire in 5 minutes.");
            mailSender.send(message);
            logger.info("OTP email sent to {}", to);
        } catch (Exception e) {
            logger.error("Failed to send OTP email to {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("Failed to send OTP email");
        }
    }

    @Override
    public void sendPasswordResetEmail(String to, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Vaahan Password Reset Request");
            message.setText("To reset your password, click the following link: " + resetLink + "\nIf you did not request a password reset, please ignore this email.");
            mailSender.send(message);
            logger.info("Password reset email sent to {}", to);
        } catch (Exception e) {
            logger.error("Failed to send password reset email to {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("Failed to send password reset email");
        }
    }
}
