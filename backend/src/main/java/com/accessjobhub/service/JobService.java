package com.accessjobhub.service;

import com.accessjobhub.dto.JobResponse;
import com.accessjobhub.entity.Job;
import com.accessjobhub.exception.NotFoundException;
import com.accessjobhub.mapper.JobMapper;
import com.accessjobhub.repository.JobRepository;
import com.accessjobhub.util.QueryLimit;
import com.accessjobhub.util.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class JobService {

    private static final String NOT_FOUND_MESSAGE = "Không tìm thấy việc làm phù hợp.";

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<JobResponse> listJobs(
            String keyword,
            String location,
            String workType,
            Boolean remoteAvailable,
            Integer limit
    ) {
        int resolvedLimit = QueryLimit.resolve(limit);
        List<Job> jobs = jobRepository.findActiveJobs(
                StringUtils.blankToNull(keyword),
                StringUtils.blankToNull(location),
                StringUtils.blankToNull(workType),
                remoteAvailable,
                PageRequest.of(0, resolvedLimit)
        );
        return jobs.stream().map(JobMapper::toResponse).toList();
    }

    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));
        return JobMapper.toResponse(job);
    }
}
