package com.accessjobhub.mapper;

import com.accessjobhub.dto.AccessibilityFeedbackResponse;
import com.accessjobhub.entity.AccessibilityFeedback;

public final class AccessibilityFeedbackMapper {

    private static final String SUCCESS_MESSAGE = "Cảm ơn bạn đã gửi phản hồi về khả năng tiếp cận.";

    private AccessibilityFeedbackMapper() {
    }

    public static AccessibilityFeedbackResponse toResponse(AccessibilityFeedback feedback) {
        return new AccessibilityFeedbackResponse(
                feedback.getId(),
                SUCCESS_MESSAGE,
                feedback.getStatus(),
                feedback.getCreatedAt()
        );
    }
}
