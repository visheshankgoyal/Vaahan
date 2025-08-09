package com.vaahan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.service.OtpService;
import com.vaahan.service.EmailService;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateOtp(@RequestParam String username) {
        otpService.generateOtp(username);
        return ResponseEntity.ok("OTP sent to " + username);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String username, @RequestParam String otp) {
        boolean verified = otpService.verifyOtp(username, otp);
        return verified ? ResponseEntity.ok("OTP verified") : ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    // Endpoint to fetch latest OTP for a user (for demo/testing only)
    @PostMapping("/fetch-otp")
    public ResponseEntity<String> fetchOtp(@RequestParam String username) {
        String otp = emailService.fetchOtpForUser(username);
        if (otp != null) {
            return ResponseEntity.ok(otp);
        } else {
            return ResponseEntity.badRequest().body("No OTP found for user");
        }
    }
}
