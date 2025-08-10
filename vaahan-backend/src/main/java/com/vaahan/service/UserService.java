package com.vaahan.service;

import java.util.List;

import com.vaahan.dto.User.UserDTO;
import com.vaahan.entities.User;

public interface UserService {
    UserDTO getUserById(Long id);
    UserDTO updateUser(Long id, UserDTO userDTO);
    List<UserDTO> getAllUsers();
    User registerUser(User user);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}


