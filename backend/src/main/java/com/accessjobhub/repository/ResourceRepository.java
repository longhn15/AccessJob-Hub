package com.accessjobhub.repository;

import com.accessjobhub.entity.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    Optional<Resource> findByIdAndActiveTrue(Long id);

    @Query("""
            SELECT r FROM Resource r
            WHERE r.active = true
              AND (:category IS NULL OR LOWER(r.category) LIKE LOWER(CONCAT('%', :category, '%')))
              AND (:resourceType IS NULL OR r.resourceType = :resourceType)
              AND (:difficultyLevel IS NULL OR r.difficultyLevel = :difficultyLevel)
              AND (:featured IS NULL OR r.featured = :featured)
              AND (:audience IS NULL OR LOWER(r.audience) LIKE LOWER(CONCAT('%', :audience, '%')))
              AND (:keyword IS NULL OR (
                    LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(r.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(r.summary) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(r.tags) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(r.keyTakeaways) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(r.content) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(r.exampleContent) LIKE LOWER(CONCAT('%', :keyword, '%'))
              ))
            ORDER BY r.featured DESC, r.sortOrder ASC, r.createdAt DESC, r.id DESC
            """)
    List<Resource> findActiveResources(
            @Param("category") String category,
            @Param("keyword") String keyword,
            @Param("resourceType") String resourceType,
            @Param("difficultyLevel") String difficultyLevel,
            @Param("audience") String audience,
            @Param("featured") Boolean featured,
            Pageable pageable
    );
}
