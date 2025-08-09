package com.vaahan.dto;



import com.vaahan.entities.SeverityLevel;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ViolationDTO {

    @NotBlank
    private String violation;

    private SeverityLevel severityLevel;
}
