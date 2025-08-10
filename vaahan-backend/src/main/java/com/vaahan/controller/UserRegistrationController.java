package com.vaahan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.dto.User.UserRegistrationDTO;
import com.vaahan.dto.User.UserResponseDTO;
import com.vaahan.entities.User;
import com.vaahan.entities.UserRole;
import com.vaahan.entities.UserStatus;
import com.vaahan.exception.UserAlreadyExistsException;
import com.vaahan.service.OtpService;
import com.vaahan.service.UserService;
import com.vaahan.util.Mapper;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class UserRegistrationController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpService otpService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> registerUser(
            @Valid @RequestBody UserRegistrationDTO registrationDTO) {
        
        log.info("Attempting to register new user: {}", registrationDTO.getEmail());
        
        try {
            // Check if user already exists
            if (userService.existsByEmail(registrationDTO.getEmail())) {
                throw new UserAlreadyExistsException("User with email " + registrationDTO.getEmail() + " already exists");
            }

            if (userService.existsByUsername(registrationDTO.getUsername())) {
                throw new UserAlreadyExistsException("Username " + registrationDTO.getUsername() + " is already taken");
            }

            // Create new user
            User user = User.builder()
                    .username(registrationDTO.getUsername())
                    .email(registrationDTO.getEmail())
                    .password(passwordEncoder.encode(registrationDTO.getPassword()))
                    .firstName(registrationDTO.getFirstName())
                    .lastName(registrationDTO.getLastName())
                    .phone(registrationDTO.getPhone())
                    .role(UserRole.USER) // Default role for new registrations
                    .accountStatus(UserStatus.ACTIVE)
                    .build();

            User savedUser = userService.registerUser(user);
            // Trigger OTP generation after registration
            otpService.generateOtp(savedUser.getEmail());
            UserResponseDTO userResponse = Mapper.toUserResponseDTO(savedUser);

            log.info("User registered successfully: {}", savedUser.getEmail());
            
            return ResponseEntity.ok(ApiResponse.success("User registered successfully", userResponse));

        } catch (UserAlreadyExistsException e) {
            log.warn("Registration failed - user already exists: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("Unexpected error during user registration: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Registration failed. Please try again later."));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<String>> verifyOtp(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String otp = payload.get("otp");
        
        log.info("OTP verification attempt for user: {}", username);
        
        try {
            // First, get the user to find their email
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Verify OTP using email (since OTP is stored with email)
            boolean verified = otpService.verifyOtp(user.getEmail(), otp);
            if (verified) {
                log.info("OTP verified successfully for user: {}", username);
                return ResponseEntity.ok(ApiResponse.success("OTP verified successfully", "Account verified"));
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

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<String>> resendOtp(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        
        log.info("Resending OTP for user: {}", username);
        
        try {
            // First, get the user to find their email
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Generate OTP using email
            otpService.generateOtp(user.getEmail());
            log.info("OTP resent successfully for user: {}", username);
            return ResponseEntity.ok(ApiResponse.success("OTP resent successfully", "OTP sent"));
        } catch (Exception e) {
            log.error("Error resending OTP for user: {}", username, e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to resend OTP. Please try again."));
        }
    }
} 