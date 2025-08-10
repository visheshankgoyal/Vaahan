package com.vaahan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.dto.AuthRequest;
import com.vaahan.dto.AuthResponse;
import com.vaahan.exception.ResourceNotFoundException;
import com.vaahan.security.CustomUserDetailsService;
import com.vaahan.security.JwtUtil;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        log.info("Login attempt for user: {}", request.getUsername());
        
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            // Load user details and generate token
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            String token = jwtUtil.generateToken(userDetails);

            log.info("Login successful for user: {}", request.getUsername());
            
            AuthResponse authResponse = new AuthResponse(token);
            return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));

        } catch (BadCredentialsException e) {
            log.warn("Login failed - invalid credentials for user: {}", request.getUsername());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid username or password"));
        } catch (ResourceNotFoundException e) {
            log.warn("Login failed - user not found: {}", request.getUsername());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User not found"));
        } catch (Exception e) {
            log.error("Unexpected error during login for user: {} - Error: {}", request.getUsername(), e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Login failed. Please try again later. Error: " + e.getMessage()));
        }
    }
}
