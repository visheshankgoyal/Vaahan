package com.vaahan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaahan.entities.ReportStatus;
import com.vaahan.entities.ViolationReport;


public interface ViolationReportRepository extends JpaRepository<ViolationReport, Long> {
	
	List<ViolationReport> findByUser_Id(Long userId);

    List<ViolationReport> findByStatus(ReportStatus status);
}
