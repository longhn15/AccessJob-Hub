# SWITCH_DB_RULE_TO_MYSQL_001

## 1. Mức độ hiểu task

**100%** — Chuyển định hướng database từ PostgreSQL sang MySQL trong rules, README, docs và cấu hình mẫu; không implement entity/API/migration.

## 2. Tóm tắt yêu cầu

- Thay mọi hướng dẫn PostgreSQL là DB chính bằng MySQL.
- Cập nhật Cursor rules (`db-rule`, `project-context`, `docker-runtime`) và `.env.example`.
- Cập nhật README/docs có nội dung DB.
- H2 vẫn được phép cho local/dev nếu cần; Docker runtime ưu tiên MySQL.
- Không sửa source FE/BE không liên quan.

## 3. Phạm vi đã thực hiện

- Sửa 3 Cursor rules.
- Cập nhật `.env.example`, `README.md`, 3 file docs.
- Không thêm MySQL container vào `docker-compose.yml`.
- Không sửa `backend/pom.xml`, entity, migration.

## 4. Danh sách file đã đọc

| File | Mục đích |
|------|----------|
| `.cursor/rules/db-rule.mdc` | Rule DB chính |
| `.cursor/rules/project-context-rule.mdc` | Tech stack |
| `.cursor/rules/docker-runtime-rule.mdc` | Service name Docker |
| `.cursor/rules/security-config-rule.mdc` | Kiểm tra mention PostgreSQL (không có) |
| `.env.example` | Biến DB mẫu |
| `README.md` | Tech stack |
| `docs/docker-run-guide.md` | Hướng dẫn DB |
| `docs/INIT_PROJECT_STRUCTURE_001.md` | Report trước |
| `docs/SETUP_CURSOR_RULES_001.md` | Report trước |
| `docker-compose.yml` | Xác nhận chưa có DB container |

## 5. Danh sách file đã tạo/sửa

| File | Hành động | PostgreSQL → MySQL |
|------|-----------|-------------------|
| `.cursor/rules/db-rule.mdc` | Sửa | description, Engine, Config, thêm MySQL conventions |
| `.cursor/rules/project-context-rule.mdc` | Sửa | Tech stack Database row |
| `.cursor/rules/docker-runtime-rule.mdc` | Sửa | service name `postgres` → `mysql` |
| `.env.example` | Sửa | `POSTGRES_*` → `MYSQL_*`, JDBC URL |
| `README.md` | Sửa | Thêm dòng Database MySQL vào tech stack |
| `docs/docker-run-guide.md` | Sửa | Section Database |
| `docs/INIT_PROJECT_STRUCTURE_001.md` | Sửa | 3 chỗ nhắc PostgreSQL |
| `docs/SETUP_CURSOR_RULES_001.md` | Sửa | 1 chỗ nhắc PostgreSQL |
| `docs/SWITCH_DB_RULE_TO_MYSQL_001.md` | Tạo mới | Report task này |

### File không sửa (và lý do)

| File | Lý do |
|------|-------|
| `.cursor/rules/security-config-rule.mdc` | Chỉ nhắc DB port chung, không mention PostgreSQL |
| `docker-compose.yml` | Chưa tích hợp DB container — giữ nguyên |
| `backend/**` | Không liên quan task; chưa có datasource config |
| `frontend/**` | Không liên quan |

## 6. Thay đổi chính

### `.env.example`

```diff
- # POSTGRES_DB=accessjobhub
- # POSTGRES_USER=accessjob
- # POSTGRES_PASSWORD=change-me
- # SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/accessjobhub
+ # MYSQL_DATABASE=accessjobhub
+ # MYSQL_USER=accessjob
+ # MYSQL_PASSWORD=change-me
+ # MYSQL_ROOT_PASSWORD=change-me-root
+ # SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/accessjobhub?...
```

### `db-rule.mdc`

- DB chính Docker: **MySQL** (`mysql:3306`, utf8mb4).
- H2 chỉ cho local/dev khi thật sự cần.

## 7. Lý do thiết kế

- MySQL phổ biến trong môi trường Docker/education; team chọn làm DB chính.
- Giữ H2 optional cho dev nhanh không cần container DB.
- Chưa thêm `mysql` service vào compose để không phá skeleton hiện tại (chỉ FE+BE).

## 8. Accessibility impact

Không có — task chỉ đổi rules/docs/config mẫu.

## 9. Docker/runtime impact

- Rules và docs hướng dẫn service `mysql` + volume khi tích hợp sau.
- **`docker-compose.yml` chưa tích hợp MySQL container ở task này** — vẫn chỉ `frontend` + `backend`.

## 10. API impact

Không có.

## 11. Database impact

- Định hướng đổi sang MySQL; chưa có schema/migration/driver trong code.

## 12. Cách kiểm tra

```bash
git status
grep -Ri "PostgreSQL\|postgres\|POSTGRES" .cursor README.md docs .env.example docker-compose.yml
docker compose config
```

## 13. Kết quả kiểm tra

| Lệnh | Kết quả |
|------|---------|
| `git status` | Có file modified (rules, docs, .env.example, README) |
| `grep PostgreSQL/postgres/POSTGRES` | **Pass** — không còn match trong phạm vi kiểm tra |
| `docker compose config` | **Pass** — exit 0 (không đổi compose) |
| FE/BE build | **Không chạy** — không sửa source |

## 14. Rủi ro còn lại

- Task tích hợp MySQL tiếp theo cần: service `mysql` trong compose, `mysql-connector-j` trong `pom.xml`, `application.yml` datasource, Flyway/schema.
- Report cũ ngoài phạm vi grep có thể vẫn nhắc PostgreSQL trong lịch sử commit — đã cập nhật `INIT_*` và `SETUP_*`.

## 15. Đề xuất tiếp theo

1. Thêm service `mysql:8` + volume vào `docker-compose.yml`.
2. Thêm `spring-boot-starter-data-jpa` + `mysql-connector-j` vào backend.
3. Cấu hình `SPRING_DATASOURCE_*` từ env và healthcheck DB.
4. Tạo schema MVP (`jobs`, `resources`, `applications`, `accessibility_feedback`).
