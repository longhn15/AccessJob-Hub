package com.accessjobhub.mapper;

import com.accessjobhub.dto.ApplicationResponse;
import com.accessjobhub.entity.Application;

public final class ApplicationMapper {

    private static final String SUCCESS_MESSAGE = "Thông tin quan tâm của bạn đã được ghi nhận.";

    private ApplicationMapper() {
    }

    public static ApplicationResponse toResponse(Application application) {
        return new ApplicationResponse(
                application.getId(),
                SUCCESS_MESSAGE,
                application.getStatus(),
                application.getCreatedAt()
        );
    }
}
