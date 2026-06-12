package com.accessjobhub.controller;

import com.accessjobhub.dto.AccessibilityFeedbackRequest;
import com.accessjobhub.dto.AccessibilityFeedbackResponse;
import com.accessjobhub.service.AccessibilityFeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accessibility-feedback")
public class AccessibilityFeedbackController {

    private final AccessibilityFeedbackService accessibilityFeedbackService;

    public AccessibilityFeedbackController(AccessibilityFeedbackService accessibilityFeedbackService) {
        this.accessibilityFeedbackService = accessibilityFeedbackService;
    }

    @PostMapping
    public ResponseEntity<AccessibilityFeedbackResponse> createFeedback(
            @Valid @RequestBody AccessibilityFeedbackRequest request
    ) {
        AccessibilityFeedbackResponse response = accessibilityFeedbackService.createFeedback(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
