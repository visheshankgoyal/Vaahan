package com.vaahan.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vaahan.dto.ApiResponse;
import com.vaahan.exception.FileStorageException;
import com.vaahan.service.FileStorageService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/files")
@Slf4j
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @Value("${file.upload.path}")
    private String uploadPath;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("File upload request received: {}", file.getOriginalFilename());
        
        try {
            String fileName = fileStorageService.storeFile(file);
            String fileUrl = fileStorageService.getFileUrl(fileName);
            
            log.info("File uploaded successfully: {}", fileName);
            return ResponseEntity.ok(ApiResponse.success("File uploaded successfully", fileUrl));
            
        } catch (FileStorageException e) {
            log.error("File storage error: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("File upload failed: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Unexpected error during file upload: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("File upload failed. Please try again later."));
        }
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        log.info("File download request for: {}", fileName);
        
        try {
            Path filePath = Paths.get(uploadPath).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                // Determine content type
                String contentType = "application/octet-stream";
                try {
                    contentType = Files.probeContentType(filePath);
                } catch (IOException e) {
                    log.warn("Could not determine content type for file: {}", fileName);
                }

                log.info("File served successfully: {}", fileName);
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                log.warn("File not found: {}", fileName);
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("Error serving file {}: {}", fileName, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 