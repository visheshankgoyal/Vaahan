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
import com.vaahan.service.UserService;
import com.vaahan.util.Mapper;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class UserRegistrationController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
} 