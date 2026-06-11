package com.accessjobhub.service;

import com.accessjobhub.dto.ResourceResponse;
import com.accessjobhub.entity.Resource;
import com.accessjobhub.exception.NotFoundException;
import com.accessjobhub.mapper.ResourceMapper;
import com.accessjobhub.repository.ResourceRepository;
import com.accessjobhub.util.QueryLimit;
import com.accessjobhub.util.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResourceService {

    private static final String NOT_FOUND_MESSAGE = "Không tìm thấy tài nguyên phù hợp.";

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<ResourceResponse> listResources(String category, String keyword, Integer limit) {
        int resolvedLimit = QueryLimit.resolve(limit);
        List<Resource> resources = resourceRepository.findActiveResources(
                StringUtils.blankToNull(category),
                StringUtils.blankToNull(keyword),
                PageRequest.of(0, resolvedLimit)
        );
        return resources.stream().map(ResourceMapper::toResponse).toList();
    }

    public ResourceResponse getResourceById(Long id) {
        Resource resource = resourceRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));
        return ResourceMapper.toResponse(resource);
    }
}
