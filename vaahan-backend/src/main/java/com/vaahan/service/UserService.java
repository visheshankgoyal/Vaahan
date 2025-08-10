package com.vaahan.service;

import java.util.List;
import java.util.Optional;

import com.vaahan.dto.User.UserDTO;
import com.vaahan.entities.User;

public interface UserService {
    UserDTO getUserById(Long id);
    UserDTO updateUser(Long id, UserDTO userDTO);
    List<UserDTO> getAllUsers();
    User registerUser(User user);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
    void initiatePasswordReset(String email, String appUrl);
    boolean resetPassword(String token, String newPassword);
}


