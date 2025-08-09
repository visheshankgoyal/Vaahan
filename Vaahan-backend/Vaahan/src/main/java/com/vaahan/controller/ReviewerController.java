package com.vaahan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.dto.ApiResponse;
import com.vaahan.dto.ViolationReportDTO;
import com.vaahan.entities.ViolationReport;
import com.vaahan.exception.ResourceNotFoundException;
import com.vaahan.service.ViolationReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/reviewer")
@Slf4j
public class ReviewerController {

    @Autowired
    private ViolationReportService reportService;

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<ViolationReportDTO>>> getAllPendingReports() {
        log.info("Reviewer requesting all pending reports");
        
        try {
            List<ViolationReportDTO> reports = reportService.getAllPendingReports();
            log.info("Successfully retrieved {} pending reports for reviewer", reports.size());
            return ResponseEntity.ok(ApiResponse.success("Pending reports retrieved successfully", reports));
            
        } catch (Exception e) {
            log.error("Error retrieving pending reports for reviewer: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve pending reports. Please try again later."));
        }
    }

    @PutMapping("/status/{reportId}")
    public ResponseEntity<ApiResponse<ViolationReport>> updateStatus(
            @PathVariable Long reportId,
            @RequestParam String status) {
        
        log.info("Reviewer updating report {} status to: {}", reportId, status);
        
        try {
            // Validate status parameter
            if (status == null || status.trim().isEmpty()) {
                throw new IllegalArgumentException("Status parameter is required");
            }
            
            ViolationReport updatedReport = reportService.updateReportStatus(reportId, status);
            log.info("Successfully updated report {} status to: {}", reportId, status);
            
            return ResponseEntity.ok(ApiResponse.success("Report status updated successfully", updatedReport));
            
        } catch (ResourceNotFoundException e) {
            log.warn("Report not found for status update: {}", reportId);
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            log.warn("Invalid status parameter: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid status parameter: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating report {} status: {}", reportId, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to update report status. Please try again later."));
        }
    }
}

