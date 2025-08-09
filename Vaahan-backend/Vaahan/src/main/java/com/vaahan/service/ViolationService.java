package com.vaahan.service;


import java.util.List;

import com.vaahan.entities.Violation;

public interface ViolationService {
    Violation addViolation(Violation violation);
    List<Violation> getAllViolations();
}
