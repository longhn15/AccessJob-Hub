package com.accessjobhub.dto;

import java.time.Instant;

public record ApplicationResponse(
        Long id,
        String message,
        String status,
        Instant createdAt
) {
}
