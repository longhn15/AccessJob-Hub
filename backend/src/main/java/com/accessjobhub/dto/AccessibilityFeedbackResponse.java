package com.accessjobhub.dto;

import java.time.Instant;

public record AccessibilityFeedbackResponse(
        Long id,
        String message,
        String status,
        Instant createdAt
) {
}
