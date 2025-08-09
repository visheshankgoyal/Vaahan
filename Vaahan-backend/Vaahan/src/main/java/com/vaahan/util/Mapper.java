package com.vaahan.util;


import com.vaahan.dto.ViolationReportDTO;
import com.vaahan.dto.User.UserDTO;
import com.vaahan.dto.User.UserResponseDTO;
import com.vaahan.entities.User;
import com.vaahan.entities.ViolationReport;

public class Mapper {

    public static UserDTO toUserDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setAccountStatus(user.getAccountStatus());
        dto.setTotalReports(user.getTotalReports());
        dto.setTotalValidReports(user.getTotalValidReports());
        return dto;
    }

    public static UserResponseDTO toUserResponseDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setUserId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setFullName(user.getFirstName() + " " + user.getLastName());
        dto.setRole(user.getRole().toString());
        dto.setAccountStatus(user.getAccountStatus().toString());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setTotalReports(user.getTotalReports());
        dto.setTotalValidReports(user.getTotalValidReports());
        dto.setVCoins(user.getVCoins());
        dto.setTotalVCoinsEarned(user.getTotalVCoinsEarned());
        return dto;
    }

    public static ViolationReportDTO toViolationReportDTO(ViolationReport report) {
        return ViolationReportDTO.builder()
                .reportId(report.getReportId())
                .userId(report.getUser().getId())
                .title(report.getTitle())
                .description(report.getDescription())
                .location(report.getLocation())
                .vehicleNumber(report.getVehicleNumber())
                .vehicleType(report.getVehicleType())
                .imageUrl(report.getImageUrl())
                .submissionTimestamp(report.getSubmissionTimestamp())
                .status(report.getStatus())
                .violationCategory(report.getViolation().getCategory().getCategoryName())
                .severityLevel(report.getViolation().getSeverityLevel())
                .build();
    }
}
