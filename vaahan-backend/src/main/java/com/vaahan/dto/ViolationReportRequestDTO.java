package com.vaahan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViolationReportRequestDTO {
    private String title;
    private String description;
    private String location;
    private String vehicleNumber;
    private String vehicleType;
    private Long userId;
    private Long violationId;
}
