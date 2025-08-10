package com.vaahan.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.vaahan.dto.ViolationReportDTO;
import com.vaahan.entities.ReportStatus;
import com.vaahan.entities.ViolationReport;
import com.vaahan.exception.FileStorageException;
import com.vaahan.exception.ResourceNotFoundException;
import com.vaahan.repository.ViolationReportRepository;
import com.vaahan.service.FileStorageService;
import com.vaahan.service.VCoinService;
import com.vaahan.service.ViolationReportService;
import com.vaahan.util.Mapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ViolationReportServiceImpl implements ViolationReportService {

    @Autowired
    private ViolationReportRepository reportRepository;

    @Autowired
    private VCoinService vCoinService;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public ViolationReport submitReport(ViolationReport report) {
        report.setStatus(ReportStatus.PENDING);
        return reportRepository.save(report);
    }

    @Override
    public ViolationReport submitReport(ViolationReport report, MultipartFile image) {
        log.info("Submitting violation report with image for user: {}", report.getUser().getUsername());
        
        try {
            // Handle image upload
            if (image != null && !image.isEmpty()) {
                String fileName = fileStorageService.storeFile(image);
                String imageUrl = fileStorageService.getFileUrl(fileName);
                report.setImageUrl(imageUrl);
                log.info("Image uploaded successfully: {}", fileName);
            } else {
                log.warn("No image provided for violation report");
                report.setImageUrl("");
            }
            
            // Set initial status
            report.setStatus(ReportStatus.PENDING);
            
            // Save the report
            ViolationReport savedReport = reportRepository.save(report);
            
            log.info("Violation report submitted successfully with ID: {}", savedReport.getReportId());
            return savedReport;
            
        } catch (FileStorageException e) {
            log.error("Failed to upload image for violation report: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        } catch (Exception e) {
            log.error("Error submitting violation report: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to submit report: " + e.getMessage());
        }
    }

    @Override
    public List<ViolationReportDTO> getReportsByUser(Long userId) {
        return reportRepository.findByUser_Id(userId)
                .stream()
                .map(Mapper::toViolationReportDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ViolationReportDTO> getAllPendingReports() {
        return reportRepository.findByStatus(ReportStatus.PENDING)
                .stream()
                .map(Mapper::toViolationReportDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ViolationReport updateReportStatus(Long reportId, String status) {
        log.info("Updating report {} status to: {}", reportId, status);
        
        ViolationReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("ViolationReport", "id", reportId));
        
        ReportStatus newStatus = ReportStatus.valueOf(status.toUpperCase());
        report.setStatus(newStatus);
        
        // If report is approved, award VCoins to the user
        if (newStatus == ReportStatus.APPROVED) {
            try {
                String severityLevel = report.getViolation().getSeverityLevel().toString();
                vCoinService.awardVCoinsForViolationReport(report.getUser(), severityLevel, reportId);
                log.info("VCoins awarded to user {} for approved report {}", report.getUser().getUsername(), reportId);
            } catch (Exception e) {
                log.error("Failed to award VCoins for approved report {}: {}", reportId, e.getMessage(), e);
                // Don't fail the status update if VCoin awarding fails
            }
        }
        
        ViolationReport savedReport = reportRepository.save(report);
        log.info("Successfully updated report {} status to: {}", reportId, status);
        
        return savedReport;
    }

    @Override
    public ViolationReportDTO getReportById(Long reportId) {
        ViolationReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("ViolationReport", "id", reportId));
        return Mapper.toViolationReportDTO(report);
    }
}

