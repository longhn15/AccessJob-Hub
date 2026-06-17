package com.accessjobhub.mapper;

import com.accessjobhub.dto.ResourceResponse;
import com.accessjobhub.entity.Resource;

import java.util.Arrays;
import java.util.List;

public final class ResourceMapper {

    private ResourceMapper() {
    }

    public static ResourceResponse toResponse(Resource resource) {
        return new ResourceResponse(
                resource.getId(),
                resource.getTitle(),
                resource.getCategory(),
                resource.getDescription(),
                resource.getSummary(),
                resource.getResourceType(),
                resource.getDifficultyLevel(),
                resource.getEstimatedReadMinutes(),
                splitLines(resource.getAudience()),
                splitCsv(resource.getTags()),
                splitLines(resource.getKeyTakeaways()),
                resource.getContent(),
                splitLines(resource.getActionSteps()),
                splitLines(resource.getChecklist()),
                splitCsv(resource.getWcagRefs()),
                resource.getExampleTitle(),
                resource.getExampleContext(),
                resource.getExampleContent(),
                resource.getExampleNote(),
                resource.getSourceName(),
                resolveSourceUrl(resource),
                resource.isFeatured(),
                resource.getSortOrder(),
                resource.getUrl(),
                resource.getCreatedAt(),
                resource.getUpdatedAt()
        );
    }

    private static String resolveSourceUrl(Resource resource) {
        if (resource.getSourceUrl() != null && !resource.getSourceUrl().isBlank()) {
            return resource.getSourceUrl().trim();
        }
        if (resource.getUrl() != null && !resource.getUrl().isBlank()) {
            return resource.getUrl().trim();
        }
        return null;
    }

    private static List<String> splitLines(String value) {
        if (value == null || value.isBlank()) {
            return List.of();
        }
        return Arrays.stream(value.split("\\R"))
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .toList();
    }

    private static List<String> splitCsv(String value) {
        if (value == null || value.isBlank()) {
            return List.of();
        }
        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(item -> !item.isEmpty())
                .toList();
    }
}
