package com.vaahan.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.vaahan.exception.FileStorageException;
import com.vaahan.service.FileStorageService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload.path}")
    private String uploadPath;

    @Value("${server.port:8080}")
    private String serverPort;

    @Override
    public String storeFile(MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                throw new FileStorageException("Failed to store empty file");
            }

            // Check file size (10MB limit)
            if (file.getSize() > 10 * 1024 * 1024) {
                throw new FileStorageException("File size exceeds 10MB limit");
            }

            // Validate file type (only images)
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new FileStorageException("Only image files are allowed");
            }

            // Create upload directory if it doesn't exist
            Path uploadDir = Paths.get(uploadPath);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            // Generate unique filename
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = UUID.randomUUID().toString() + fileExtension;

            // Store file
            Path targetLocation = uploadDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            log.info("File stored successfully: {}", fileName);
            return fileName;

        } catch (IOException ex) {
            log.error("Failed to store file: {}", ex.getMessage());
            throw new FileStorageException("Failed to store file", ex);
        }
    }

    @Override
    public void deleteFile(String filePath) {
        try {
            if (filePath != null && !filePath.isEmpty()) {
                Path file = Paths.get(uploadPath).resolve(filePath);
                if (Files.exists(file)) {
                    Files.delete(file);
                    log.info("File deleted successfully: {}", filePath);
                }
            }
        } catch (IOException ex) {
            log.error("Failed to delete file: {}", ex.getMessage());
            throw new FileStorageException("Failed to delete file", ex);
        }
    }

    @Override
    public String getFileUrl(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return null;
        }
        return "http://localhost:" + serverPort + "/api/files/" + fileName;
    }
} 