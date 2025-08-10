package com.vaahan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.service.OtpService;
import com.vaahan.service.EmailService;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/otp")
@Slf4j
public class OtpController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<String>> generateOtp(@RequestParam String username) {
        log.info("Generating OTP for user: {}", username);
        
        try {
            otpService.generateOtp(username);
            log.info("OTP generated successfully for user: {}", username);
            return ResponseEntity.ok(ApiResponse.success("OTP sent successfully", "OTP sent to " + username));
        } catch (Exception e) {
            log.error("Error generating OTP for user: {}", username, e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to generate OTP. Please try again."));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verifyOtp(@RequestParam String username, @RequestParam String otp) {
        log.info("OTP verification attempt for user: {}", username);
        
        try {
            boolean verified = otpService.verifyOtp(username, otp);
            if (verified) {
                log.info("OTP verified successfully for user: {}", username);
                return ResponseEntity.ok(ApiResponse.success("OTP verified successfully", "OTP verified"));
            } else {
                log.warn("OTP verification failed for user: {}", username);
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Invalid or expired OTP"));
            }
        } catch (Exception e) {
            log.error("Error during OTP verification for user: {}", username, e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("OTP verification failed. Please try again."));
        }
    }

    // Endpoint to fetch latest OTP for a user (for demo/testing only)
    @PostMapping("/fetch-otp")
    public ResponseEntity<ApiResponse<String>> fetchOtp(@RequestParam String username) {
        log.info("Fetching OTP for user: {}", username);
        
        try {
            String otp = emailService.fetchOtpForUser(username);
            if (otp != null) {
                log.info("OTP fetched successfully for user: {}", username);
                return ResponseEntity.ok(ApiResponse.success("OTP fetched successfully", otp));
            } else {
                log.warn("No OTP found for user: {}", username);
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("No OTP found for user"));
            }
        } catch (Exception e) {
            log.error("Error fetching OTP for user: {}", username, e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to fetch OTP. Please try again."));
        }
    }
}
