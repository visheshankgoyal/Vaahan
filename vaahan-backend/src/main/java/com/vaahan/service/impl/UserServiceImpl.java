package com.vaahan.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vaahan.dto.User.UserDTO;
import com.vaahan.entities.User;
import com.vaahan.exception.ResourceNotFoundException;
import com.vaahan.repository.UserRepository;
import com.vaahan.service.UserService;
import com.vaahan.util.Mapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO getUserById(Long id) {
        log.info("Fetching user with ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        log.info("User found: {}", user.getUsername());
        return Mapper.toUserDTO(user);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        log.info("Updating user with ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhone(userDTO.getPhone());
        
        User updatedUser = userRepository.save(user);
        log.info("User updated successfully: {}", updatedUser.getUsername());
        return Mapper.toUserDTO(updatedUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        log.info("Fetching all users");
        List<UserDTO> users = userRepository.findAll().stream()
                .map(Mapper::toUserDTO)
                .collect(Collectors.toList());
        log.info("Found {} users", users.size());
        return users;
    }

    @Override
    public User registerUser(User user) {
        log.info("Registering new user: {}", user.getUsername());
        try {
            User savedUser = userRepository.save(user);
            log.info("User registered successfully with ID: {}", savedUser.getId());
            return savedUser;
        } catch (Exception e) {
            log.error("Failed to register user: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to register user", e);
        }
    }

    @Override
    public boolean existsByEmail(String email) {
        log.debug("Checking if user exists with email: {}", email);
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByUsername(String username) {
        log.debug("Checking if user exists with username: {}", username);
        return userRepository.existsByUsername(username);
    }
}



