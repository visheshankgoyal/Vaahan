package com.vaahan.service;

import java.util.List;

import com.vaahan.dto.ViolationReportDTO;
import com.vaahan.entities.ViolationReport;

public interface ViolationReportService {
    ViolationReport submitReport(ViolationReport report);
    List<ViolationReportDTO> getReportsByUser(Long userId);
    List<ViolationReportDTO> getAllPendingReports();
    ViolationReport updateReportStatus(Long reportId, String status);
    ViolationReportDTO getReportById(Long reportId);
}

