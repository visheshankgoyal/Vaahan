package com.vaahan.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    
    /**
     * Store a file and return the file path
     * @param file The file to store
     * @return The stored file path
     */
    String storeFile(MultipartFile file);
    
    /**
     * Delete a file by its path
     * @param filePath The path of the file to delete
     */
    void deleteFile(String filePath);
    
    /**
     * Get the full URL for a file
     * @param fileName The file name
     * @return The full URL
     */
    String getFileUrl(String fileName);
} 