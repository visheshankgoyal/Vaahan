package com.vaahan.dto.User;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long userId;
    private String username;
    private String email;
    private String phone;
    private String fullName;
    private String accountStatus;
    private LocalDateTime createdAt;
    private int totalReports;
    private int totalValidReports;
    private String role;
    private int vCoins;
    private int totalVCoinsEarned;
}
