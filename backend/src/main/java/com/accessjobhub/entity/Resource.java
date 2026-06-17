package com.accessjobhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 600)
    private String summary;

    @Column(name = "resource_type", length = 50)
    private String resourceType;

    @Column(name = "difficulty_level", length = 50)
    private String difficultyLevel;

    @Column(name = "estimated_read_minutes")
    private Integer estimatedReadMinutes;

    @Column(columnDefinition = "TEXT")
    private String audience;

    @Column(length = 500)
    private String tags;

    @Column(name = "key_takeaways", columnDefinition = "TEXT")
    private String keyTakeaways;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "action_steps", columnDefinition = "TEXT")
    private String actionSteps;

    @Column(columnDefinition = "TEXT")
    private String checklist;

    @Column(name = "wcag_refs", length = 255)
    private String wcagRefs;

    @Column(name = "example_title", length = 255)
    private String exampleTitle;

    @Column(name = "example_context", length = 500)
    private String exampleContext;

    @Column(name = "example_content", columnDefinition = "TEXT")
    private String exampleContent;

    @Column(name = "example_note", length = 500)
    private String exampleNote;

    @Column(name = "source_name", length = 255)
    private String sourceName;

    @Column(name = "source_url", length = 500)
    private String sourceUrl;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "is_featured", nullable = false)
    private boolean featured;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "is_active", nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false, insertable = false, updatable = false)
    private Instant updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public Integer getEstimatedReadMinutes() {
        return estimatedReadMinutes;
    }

    public void setEstimatedReadMinutes(Integer estimatedReadMinutes) {
        this.estimatedReadMinutes = estimatedReadMinutes;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getKeyTakeaways() {
        return keyTakeaways;
    }

    public void setKeyTakeaways(String keyTakeaways) {
        this.keyTakeaways = keyTakeaways;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getActionSteps() {
        return actionSteps;
    }

    public void setActionSteps(String actionSteps) {
        this.actionSteps = actionSteps;
    }

    public String getChecklist() {
        return checklist;
    }

    public void setChecklist(String checklist) {
        this.checklist = checklist;
    }

    public String getWcagRefs() {
        return wcagRefs;
    }

    public void setWcagRefs(String wcagRefs) {
        this.wcagRefs = wcagRefs;
    }

    public String getExampleTitle() {
        return exampleTitle;
    }

    public void setExampleTitle(String exampleTitle) {
        this.exampleTitle = exampleTitle;
    }

    public String getExampleContext() {
        return exampleContext;
    }

    public void setExampleContext(String exampleContext) {
        this.exampleContext = exampleContext;
    }

    public String getExampleContent() {
        return exampleContent;
    }

    public void setExampleContent(String exampleContent) {
        this.exampleContent = exampleContent;
    }

    public String getExampleNote() {
        return exampleNote;
    }

    public void setExampleNote(String exampleNote) {
        this.exampleNote = exampleNote;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
