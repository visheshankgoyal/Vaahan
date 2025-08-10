package com.vaahan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vaahan.dto.ApiResponse;
import com.vaahan.dto.ViolationReportDTO;
import com.vaahan.entities.User;
import com.vaahan.entities.ViolationReport;
import com.vaahan.service.UserService;
import com.vaahan.service.ViolationReportService;
import com.vaahan.util.Mapper;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/reports")
@Slf4j
public class ViolationReportController {

    @Autowired
    private ViolationReportService violationReportService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<ViolationReportDTO>> submitReport(
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("violationType") String violationType,
            @RequestParam(value = "vehicleNumber", required = false) String vehicleNumber,
            @RequestParam("severity") String severity,
            @RequestParam("image") MultipartFile image) {
        
        try {
            // Get current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            log.info("User {} submitting violation report", username);
            
            // Create violation report
            ViolationReport report = ViolationReport.builder()
                    .user(user)
                    .location(location)
                    .description(description)
                    .vehicleNumber(vehicleNumber)
                    .imageUrl("") // Will be set after file upload
                    .build();
            
            // Submit report with image
            ViolationReport savedReport = violationReportService.submitReport(report, image);
            
            // Convert to DTO
            ViolationReportDTO reportDTO = Mapper.toViolationReportDTO(savedReport);
            
            log.info("Violation report submitted successfully by user: {}", username);
            
            return ResponseEntity.ok(ApiResponse.success("Violation report submitted successfully", reportDTO));
            
        } catch (Exception e) {
            log.error("Error submitting violation report: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to submit report. Please try again later."));
        }
    }
}

