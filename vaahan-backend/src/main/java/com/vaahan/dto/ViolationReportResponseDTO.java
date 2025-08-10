package com.vaahan.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViolationReportResponseDTO {
    private Long reportId;
    private String title;
    private String description;
    private String location;
    private String vehicleNumber;
    private String vehicleType;
    private LocalDateTime submissionTimestamp;
    private String status;
    private String category;
    private String severityLevel;
}
