package com.accessjobhub.service;

import com.accessjobhub.dto.AccessibilityFeedbackRequest;
import com.accessjobhub.dto.AccessibilityFeedbackResponse;
import com.accessjobhub.entity.AccessibilityFeedback;
import com.accessjobhub.mapper.AccessibilityFeedbackMapper;
import com.accessjobhub.repository.AccessibilityFeedbackRepository;
import com.accessjobhub.util.StringUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccessibilityFeedbackService {

    private static final String STATUS_PENDING = "pending";

    @PersistenceContext
    private EntityManager entityManager;

    private final AccessibilityFeedbackRepository accessibilityFeedbackRepository;

    public AccessibilityFeedbackService(AccessibilityFeedbackRepository accessibilityFeedbackRepository) {
        this.accessibilityFeedbackRepository = accessibilityFeedbackRepository;
    }

    @Transactional
    public AccessibilityFeedbackResponse createFeedback(AccessibilityFeedbackRequest request) {
        AccessibilityFeedback feedback = new AccessibilityFeedback();
        feedback.setCategory(request.category().trim());
        feedback.setDescription(request.description().trim());
        feedback.setContactEmail(StringUtils.blankToNull(request.contactEmail()));
        feedback.setStatus(STATUS_PENDING);

        AccessibilityFeedback saved = accessibilityFeedbackRepository.save(feedback);
        entityManager.flush();
        entityManager.refresh(saved);
        return AccessibilityFeedbackMapper.toResponse(saved);
    }
}
