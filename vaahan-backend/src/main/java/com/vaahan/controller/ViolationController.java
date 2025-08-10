package com.vaahan.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaahan.entities.Violation;
import com.vaahan.service.ViolationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/violations")
public class ViolationController {

    @Autowired
    private ViolationService violationService;

    @PostMapping
    public ResponseEntity<Violation> createViolation(@Valid @RequestBody Violation violation) {
        return ResponseEntity.ok(violationService.addViolation(violation));
    }

    @GetMapping
    public ResponseEntity<List<Violation>> getAllViolations() {
        return ResponseEntity.ok(violationService.getAllViolations());
    }
}

