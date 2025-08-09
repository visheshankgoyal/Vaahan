package com.vaahan.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.vaahan.entities.User;
import com.vaahan.entities.UserRole;
import com.vaahan.entities.UserStatus;
import com.vaahan.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class UserDataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Initializing default users...");
        
        // Create Admin user
        createUserIfNotExists("admin", "admin@vaahan.com", "admin123", "Admin", "User", UserRole.ADMIN);
        
        // Create Reviewer user
        createUserIfNotExists("reviewer", "reviewer@vaahan.com", "reviewer123", "Reviewer", "User", UserRole.REVIEWER);
        
        // Create a test User
        createUserIfNotExists("user", "user@vaahan.com", "user123", "Test", "User", UserRole.USER);
        
        log.info("Default users initialized successfully");
    }

    private void createUserIfNotExists(String username, String email, String password, String firstName, String lastName, UserRole role) {
        if (!userRepository.existsByUsername(username) && !userRepository.existsByEmail(email)) {
            User user = User.builder()
                    .username(username)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .firstName(firstName)
                    .lastName(lastName)
                    .role(role)
                    .accountStatus(UserStatus.ACTIVE)
                    .build();
            
            User savedUser = userRepository.save(user);
            log.info("Created {} user: {} (ID: {})", role, username, savedUser.getId());
        } else {
            log.debug("User {} already exists", username);
        }
    }
} 