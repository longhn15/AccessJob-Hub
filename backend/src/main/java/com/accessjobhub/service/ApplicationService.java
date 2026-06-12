package com.accessjobhub.service;

import com.accessjobhub.dto.ApplicationRequest;
import com.accessjobhub.dto.ApplicationResponse;
import com.accessjobhub.entity.Application;
import com.accessjobhub.entity.Job;
import com.accessjobhub.exception.NotFoundException;
import com.accessjobhub.mapper.ApplicationMapper;
import com.accessjobhub.repository.ApplicationRepository;
import com.accessjobhub.repository.JobRepository;
import com.accessjobhub.util.StringUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ApplicationService {

    private static final String JOB_NOT_FOUND_MESSAGE =
            "Không tìm thấy việc làm phù hợp để gửi thông tin quan tâm.";
    private static final String STATUS_PENDING = "pending";

    @PersistenceContext
    private EntityManager entityManager;

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    @Transactional
    public ApplicationResponse createApplication(ApplicationRequest request) {
        Job job = jobRepository.findByIdAndActiveTrue(request.jobId())
                .orElseThrow(() -> new NotFoundException(JOB_NOT_FOUND_MESSAGE));

        Application application = new Application();
        application.setJob(job);
        application.setFullName(request.fullName().trim());
        application.setEmail(request.email().trim());
        application.setPhone(StringUtils.blankToNull(request.phone()));
        application.setMessage(StringUtils.blankToNull(request.message()));
        application.setStatus(STATUS_PENDING);

        Application saved = applicationRepository.save(application);
        entityManager.flush();
        entityManager.refresh(saved);
        return ApplicationMapper.toResponse(saved);
    }
}
