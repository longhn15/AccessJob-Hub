package com.accessjobhub.mapper;

import com.accessjobhub.dto.ResourceResponse;
import com.accessjobhub.entity.Resource;

public final class ResourceMapper {

    private ResourceMapper() {
    }

    public static ResourceResponse toResponse(Resource resource) {
        return new ResourceResponse(
                resource.getId(),
                resource.getTitle(),
                resource.getCategory(),
                resource.getDescription(),
                resource.getUrl(),
                resource.getCreatedAt(),
                resource.getUpdatedAt()
        );
    }
}
