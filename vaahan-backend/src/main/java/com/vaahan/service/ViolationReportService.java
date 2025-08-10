package com.vaahan.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.vaahan.dto.ViolationReportDTO;
import com.vaahan.entities.ViolationReport;

public interface ViolationReportService {
    ViolationReport submitReport(ViolationReport report);
    ViolationReport submitReport(ViolationReport report, MultipartFile image);
    List<ViolationReportDTO> getReportsByUser(Long userId);
    List<ViolationReportDTO> getAllPendingReports();
    ViolationReport updateReportStatus(Long reportId, String status);
    ViolationReportDTO getReportById(Long reportId);
}

