package com.vaahan.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 15)
    private String phone;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Column(length = 100)
    private String resetToken;

    private LocalDateTime resetTokenExpiry;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private UserStatus accountStatus = UserStatus.ACTIVE;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private int totalReports = 0;

    @Builder.Default
    private int totalValidReports = 0;

    @Builder.Default
    private int vCoins = 0; // VCoin balance for the user

    @Builder.Default
    private int totalVCoinsEarned = 0; // Total VCoins earned over time
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    
    public boolean isEnabled() {
        return this.accountStatus == UserStatus.ACTIVE; // Or your enum logic
    }

    // Method to add VCoins to user balance
    public void addVCoins(int coins) {
        this.vCoins += coins;
        this.totalVCoinsEarned += coins;
    }

    // Method to deduct VCoins from user balance
    public boolean deductVCoins(int coins) {
        if (this.vCoins >= coins) {
            this.vCoins -= coins;
            return true;
        }
        return false;
    }

//    @ElementCollection(fetch = FetchType.EAGER)
//    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
//    @Column(name = "role")
//    private List<String> roles;
//    
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<ViolationReport> reports;
}
