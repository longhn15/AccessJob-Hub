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
              AND (:keyword IS NULL OR (
                    LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(r.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
              ))
            ORDER BY r.createdAt DESC, r.id DESC
            """)
    List<Resource> findActiveResources(
            @Param("category") String category,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
