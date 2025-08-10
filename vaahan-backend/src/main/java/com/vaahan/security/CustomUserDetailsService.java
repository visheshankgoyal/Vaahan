package com.vaahan.security;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vaahan.entities.User;
import com.vaahan.entities.UserStatus;
import com.vaahan.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Loading user details for username/email: {}", username);
        
        User user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> {
                    log.warn("User not found with username or email: {}", username);
                    return new UsernameNotFoundException("User not found with username or email: " + username);
                });

        List<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        boolean isEnabled = user.getAccountStatus() == UserStatus.ACTIVE;
        
        log.debug("User found: {} with role: {} and status: {}", 
                 user.getUsername(), user.getRole(), user.getAccountStatus());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                isEnabled, // enabled
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                authorities
        );
    }
}
