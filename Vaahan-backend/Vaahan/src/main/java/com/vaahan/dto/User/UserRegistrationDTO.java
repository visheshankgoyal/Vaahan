package com.vaahan.dto.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    @NotBlank
    private String username;

    @Email
    private String email;

    @NotBlank
    private String password;

    @Pattern(regexp = "\\d{10}")
    private String phone;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;
}

