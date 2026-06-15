package com.accessjobhub.mapper;

import com.accessjobhub.dto.JobResponse;
import com.accessjobhub.entity.Job;

public final class JobMapper {

    private JobMapper() {
    }

    public static JobResponse toResponse(Job job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getCompanyName(),
                job.getLocation(),
                job.getWorkType(),
                job.getExperienceLevel(),
                job.getSalaryRange(),
                job.getWorkPlace(),
                job.isRemoteAvailable(),
                job.getAccessibilitySupport(),
                job.getShortDescription(),
                job.getFullDescription(),
                job.getRequirements(),
                job.getContactEmail(),
                job.getCreatedAt(),
                job.getUpdatedAt()
        );
    }
}
