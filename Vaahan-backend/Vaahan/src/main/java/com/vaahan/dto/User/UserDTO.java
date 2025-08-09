package com.vaahan.dto.User;

import com.vaahan.entities.UserRole;
import com.vaahan.entities.UserStatus;

public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private UserStatus accountStatus;
    private int totalReports;
    private int totalValidReports;

    private UserRole role;

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public UserStatus getAccountStatus() {
        return accountStatus;
    }
    public void setAccountStatus(UserStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public int getTotalReports() {
        return totalReports;
    }
    public void setTotalReports(int totalReports) {
        this.totalReports = totalReports;
    }

    public int getTotalValidReports() {
        return totalValidReports;
    }
    public void setTotalValidReports(int totalValidReports) {
        this.totalValidReports = totalValidReports;
    }
}
