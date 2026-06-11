package com.accessjobhub.dto;

import java.time.Instant;

public record ResourceResponse(
        Long id,
        String title,
        String category,
        String description,
        String url,
        Instant createdAt,
        Instant updatedAt
) {
}
