package com.accessjobhub.controller;

import com.accessjobhub.dto.ResourceResponse;
import com.accessjobhub.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public ResponseEntity<List<ResourceResponse>> listResources(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String resourceType,
            @RequestParam(required = false) String difficultyLevel,
            @RequestParam(required = false) String audience,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Integer limit
    ) {
        return ResponseEntity.ok(resourceService.listResources(
                category,
                keyword,
                resourceType,
                difficultyLevel,
                audience,
                featured,
                limit
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceResponse> getResourceById(@PathVariable Long id) {
        return ResponseEntity.ok(resourceService.getResourceById(id));
    }
}
