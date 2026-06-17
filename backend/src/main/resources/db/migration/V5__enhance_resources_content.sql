-- Rich content fields for resources (guides, checklists, examples)

ALTER TABLE resources
    ADD COLUMN summary VARCHAR(600) NULL AFTER description,
    ADD COLUMN resource_type VARCHAR(50) NULL AFTER summary,
    ADD COLUMN difficulty_level VARCHAR(50) NULL AFTER resource_type,
    ADD COLUMN estimated_read_minutes INT NULL AFTER difficulty_level,
    ADD COLUMN audience TEXT NULL AFTER estimated_read_minutes,
    ADD COLUMN tags VARCHAR(500) NULL AFTER audience,
    ADD COLUMN key_takeaways TEXT NULL AFTER tags,
    ADD COLUMN content TEXT NULL AFTER key_takeaways,
    ADD COLUMN action_steps TEXT NULL AFTER content,
    ADD COLUMN checklist TEXT NULL AFTER action_steps,
    ADD COLUMN wcag_refs VARCHAR(255) NULL AFTER checklist,
    ADD COLUMN example_title VARCHAR(255) NULL AFTER wcag_refs,
    ADD COLUMN example_context VARCHAR(500) NULL AFTER example_title,
    ADD COLUMN example_content TEXT NULL AFTER example_context,
    ADD COLUMN example_note VARCHAR(500) NULL AFTER example_content,
    ADD COLUMN source_name VARCHAR(255) NULL AFTER example_note,
    ADD COLUMN source_url VARCHAR(500) NULL AFTER source_name,
    ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT FALSE AFTER source_url,
    ADD COLUMN sort_order INT NOT NULL DEFAULT 0 AFTER is_featured;

CREATE INDEX idx_resources_resource_type ON resources (resource_type);
CREATE INDEX idx_resources_difficulty_level ON resources (difficulty_level);
CREATE INDEX idx_resources_is_featured ON resources (is_featured);
CREATE INDEX idx_resources_sort_order ON resources (sort_order);
