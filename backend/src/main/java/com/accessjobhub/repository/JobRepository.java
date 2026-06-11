package com.accessjobhub.repository;

import com.accessjobhub.entity.Job;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {

    Optional<Job> findByIdAndActiveTrue(Long id);

    @Query("""
            SELECT j FROM Job j
            WHERE j.active = true
              AND (:keyword IS NULL OR (
                    LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(j.shortDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(j.fullDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(j.requirements) LIKE LOWER(CONCAT('%', :keyword, '%'))
              ))
              AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))
              AND (:workType IS NULL OR j.workType = :workType)
              AND (:remoteAvailable IS NULL OR j.remoteAvailable = :remoteAvailable)
            ORDER BY j.createdAt DESC, j.id DESC
            """)
    List<Job> findActiveJobs(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("workType") String workType,
            @Param("remoteAvailable") Boolean remoteAvailable,
            Pageable pageable
    );
}
