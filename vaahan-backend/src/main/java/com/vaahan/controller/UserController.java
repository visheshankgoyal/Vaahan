package com.vaahan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.dto.User.ForgotPasswordRequestDTO;
import com.vaahan.dto.User.PasswordResetRequestDTO;
import com.vaahan.dto.User.UserDTO;
import com.vaahan.dto.User.UserResponseDTO;
import com.vaahan.entities.User;
import com.vaahan.service.UserService;
import com.vaahan.util.Mapper;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getCurrentUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            log.info("Fetching profile for user: {}", username);
            
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            UserResponseDTO userResponse = Mapper.toUserResponseDTO(user);
            
            log.info("Profile fetched successfully for user: {}", username);
            return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", userResponse));
            
        } catch (Exception e) {
            log.error("Error fetching user profile: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve profile. Please try again later."));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @PostMapping("/auth/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequestDTO request) {
        userService.initiatePasswordReset(request.getEmail(), frontendUrl);
        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequestDTO request) {
        boolean success = userService.resetPassword(request.getToken(), request.getNewPassword());
        if (success) {
            return ResponseEntity.ok("Password reset successful.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired reset token.");
        }
    }
}
