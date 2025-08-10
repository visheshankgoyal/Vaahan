package com.vaahan.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vaahan.entities.Violation;
import com.vaahan.repository.ViolationRepository;
import com.vaahan.service.ViolationService;

@Service
public class ViolationServiceImpl implements ViolationService {

    @Autowired
    private ViolationRepository violationRepository;

    @Override
    public Violation addViolation(Violation violation) {
        return violationRepository.save(violation);
    }

    @Override
    public List<Violation> getAllViolations() {
        return violationRepository.findAll();
    }
}

