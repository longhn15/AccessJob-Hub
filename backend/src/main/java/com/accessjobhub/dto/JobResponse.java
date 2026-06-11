package com.accessjobhub.dto;

import java.time.Instant;

public record JobResponse(
        Long id,
        String title,
        String companyName,
        String location,
        String workType,
        boolean remoteAvailable,
        String accessibilitySupport,
        String shortDescription,
        String fullDescription,
        String requirements,
        String contactEmail,
        Instant createdAt,
        Instant updatedAt
) {
}
