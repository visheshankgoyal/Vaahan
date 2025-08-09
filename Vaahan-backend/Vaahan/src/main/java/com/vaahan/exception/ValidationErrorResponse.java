package com.vaahan.exception;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ValidationErrorResponse extends ErrorResponse {
    private Map<String, String> fieldErrors;

    public ValidationErrorResponse(int status, String error, String message, 
                                 LocalDateTime timestamp, Map<String, String> fieldErrors) {
        super(status, error, message, timestamp);
        this.fieldErrors = fieldErrors;
    }
} 