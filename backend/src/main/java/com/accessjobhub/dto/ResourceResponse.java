package com.accessjobhub.dto;

import java.time.Instant;
import java.util.List;

public record ResourceResponse(
        Long id,
        String title,
        String category,
        String description,
        String summary,
        String resourceType,
        String difficultyLevel,
        Integer estimatedReadMinutes,
        List<String> audience,
        List<String> tags,
        List<String> keyTakeaways,
        String content,
        List<String> actionSteps,
        List<String> checklist,
        List<String> wcagRefs,
        String exampleTitle,
        String exampleContext,
        String exampleContent,
        String exampleNote,
        String sourceName,
        String sourceUrl,
        Boolean featured,
        Integer sortOrder,
        String url,
        Instant createdAt,
        Instant updatedAt
) {
}
