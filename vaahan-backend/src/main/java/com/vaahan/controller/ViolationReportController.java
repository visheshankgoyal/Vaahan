package com.vaahan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vaahan.dto.ApiResponse;
import com.vaahan.dto.ViolationReportDTO;
import com.vaahan.entities.ViolationReport;
import com.vaahan.exception.FileStorageException;
import com.vaahan.exception.ResourceNotFoundException;
import com.vaahan.service.FileStorageService;
import com.vaahan.service.ViolationReportService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/reports")
@Slf4j
public class ViolationReportController {

    @Autowired
    private ViolationReportService reportService;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ViolationReport>> submitReport(@Valid @RequestBody ViolationReport report) {
        log.info("Submitting violation report for user: {}", report.getUser().getId());
        
        try {
            ViolationReport savedReport = reportService.submitReport(report);
            log.info("Violation report submitted successfully with ID: {}", savedReport.getReportId());
            return ResponseEntity.ok(ApiResponse.success("Report submitted successfully", savedReport));
            
        } catch (Exception e) {
            log.error("Error submitting violation report: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to submit report. Please try again later."));
        }
    }

    @PostMapping("/with-image")
    public ResponseEntity<ApiResponse<ViolationReport>> submitReportWithImage(
            @Valid @RequestBody ViolationReport report,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        log.info("Submitting violation report with image for user: {}", report.getUser().getId());
        
        try {
            // Handle image upload if provided
            if (image != null && !image.isEmpty()) {
                try {
                    String imageUrl = fileStorageService.storeFile(image);
                    report.setImageUrl(fileStorageService.getFileUrl(imageUrl));
                    log.info("Image uploaded successfully: {}", imageUrl);
                } catch (FileStorageException e) {
                    log.error("Failed to upload image: {}", e.getMessage());
                    return ResponseEntity.badRequest()
                            .body(ApiResponse.error("Failed to upload image: " + e.getMessage()));
                }
            }
            
            ViolationReport savedReport = reportService.submitReport(report);
            log.info("Violation report with image submitted successfully with ID: {}", savedReport.getReportId());
            return ResponseEntity.ok(ApiResponse.success("Report with image submitted successfully", savedReport));
            
        } catch (Exception e) {
            log.error("Error submitting violation report with image: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to submit report. Please try again later."));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ViolationReportDTO>>> getUserReports(@PathVariable Long userId) {
        log.info("Fetching reports for user: {}", userId);
        
        try {
            List<ViolationReportDTO> reports = reportService.getReportsByUser(userId);
            log.info("Found {} reports for user: {}", reports.size(), userId);
            return ResponseEntity.ok(ApiResponse.success("User reports retrieved successfully", reports));
            
        } catch (Exception e) {
            log.error("Error fetching reports for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve user reports. Please try again later."));
        }
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<ApiResponse<ViolationReportDTO>> getReportById(@PathVariable Long reportId) {
        log.info("Fetching report with ID: {}", reportId);
        
        try {
            ViolationReportDTO report = reportService.getReportById(reportId);
            return ResponseEntity.ok(ApiResponse.success("Report retrieved successfully", report));
            
        } catch (ResourceNotFoundException e) {
            log.warn("Report not found: {}", reportId);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching report {}: {}", reportId, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve report. Please try again later."));
        }
    }
}

