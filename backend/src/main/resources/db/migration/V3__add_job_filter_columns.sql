-- Filter fields for jobs: experience, salary band, work place preset

ALTER TABLE jobs
    ADD COLUMN experience_level VARCHAR(50) NULL AFTER work_type,
    ADD COLUMN salary_range VARCHAR(50) NULL AFTER experience_level,
    ADD COLUMN work_place VARCHAR(50) NULL AFTER salary_range;

CREATE INDEX idx_jobs_experience_level ON jobs (experience_level);
CREATE INDEX idx_jobs_salary_range ON jobs (salary_range);
CREATE INDEX idx_jobs_work_place ON jobs (work_place);

-- Backfill existing seed rows (ids 1–3 from V2)
UPDATE jobs SET experience_level = 'none', salary_range = '5-10m', work_place = 'hybrid'
WHERE id = 1;

UPDATE jobs SET experience_level = '1-2', salary_range = '10-15m', work_place = 'hcm'
WHERE id = 2;

UPDATE jobs SET experience_level = 'none', salary_range = 'under-5m', work_place = 'remote'
WHERE id = 3;
