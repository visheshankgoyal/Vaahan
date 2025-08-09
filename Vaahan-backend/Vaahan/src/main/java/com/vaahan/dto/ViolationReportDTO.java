package com.vaahan.dto;



import java.time.LocalDateTime;

import com.vaahan.entities.ReportStatus;
import com.vaahan.entities.SeverityLevel;

import lombok.Builder;

@Builder
public class ViolationReportDTO {
    private Long reportId;
    private Long userId;
    private String title;
    private String description;
    private String location;
    private String vehicleNumber;
    private String vehicleType;
    private String imageUrl;
    private LocalDateTime submissionTimestamp;
    private ReportStatus status;
    private String violationCategory;
    private SeverityLevel severityLevel;

    // Getters and Setters
    public Long getReportId() {
        return reportId;
    }
    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }
    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }
    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }



    // Getter
    public SeverityLevel getSeverityLevel() {
        return severityLevel;
    }

    // Setter
    public void setSeverityLevel(SeverityLevel severityLevel) {
        this.severityLevel = severityLevel;
    }

    public LocalDateTime getSubmissionTimestamp() {
        return submissionTimestamp;
    }
    public void setSubmissionTimestamp(LocalDateTime submissionTimestamp) {
        this.submissionTimestamp = submissionTimestamp;
    }

    public ReportStatus getStatus() {
        return status;
    }
    public void setStatus(ReportStatus status) {
        this.status = status;
    }

    public String getViolationCategory() {
        return violationCategory;
    }
    public void setViolationCategory(String violationCategory) {
        this.violationCategory = violationCategory;
    }
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
