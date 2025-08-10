package com.vaahan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.dto.User.UserDTO;
import com.vaahan.entities.User;
import com.vaahan.entities.UserRole;
import com.vaahan.entities.UserStatus;
import com.vaahan.exception.UserAlreadyExistsException;
import com.vaahan.service.UserService;
import com.vaahan.util.Mapper;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/admin")
@Slf4j
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        log.info("Admin requesting all users");
        
        try {
            List<UserDTO> users = userService.getAllUsers();
            log.info("Successfully retrieved {} users for admin", users.size());
            return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
            
        } catch (Exception e) {
            log.error("Error retrieving users for admin: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve users. Please try again later."));
        }
    }

    @PostMapping("/create-user")
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@RequestBody CreateUserRequest request) {
        log.info("Admin creating new user: {}", request.getUsername());
        
        try {
            // Check if user already exists
            if (userService.existsByEmail(request.getEmail())) {
                throw new UserAlreadyExistsException("User with email " + request.getEmail() + " already exists");
            }

            if (userService.existsByUsername(request.getUsername())) {
                throw new UserAlreadyExistsException("Username " + request.getUsername() + " is already taken");
            }

            // Create new user
            User user = User.builder()
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .phone(request.getPhone())
                    .role(request.getRole())
                    .accountStatus(UserStatus.ACTIVE)
                    .build();

            User savedUser = userService.registerUser(user);
            UserDTO userResponse = Mapper.toUserDTO(savedUser);

            log.info("Admin successfully created user: {}", savedUser.getUsername());
            
            return ResponseEntity.ok(ApiResponse.success("User created successfully", userResponse));

        } catch (UserAlreadyExistsException e) {
            log.warn("Admin failed to create user - user already exists: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("Unexpected error during user creation by admin: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to create user. Please try again later."));
        }
    }

    // Inner class for create user request
    public static class CreateUserRequest {
        private String username;
        private String email;
        private String password;
        private String firstName;
        private String lastName;
        private String phone;
        private UserRole role;

        // Getters and Setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        
        public UserRole getRole() { return role; }
        public void setRole(UserRole role) { this.role = role; }
    }
}

