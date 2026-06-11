# MYSQL_DOCKER_SETUP_001

## 1. Mức độ hiểu task

**100%** — Tích hợp MySQL 8 vào Docker Compose, cấu hình backend kết nối DB qua service name, chưa implement entity/API nghiệp vụ.

## 2. Tóm tắt yêu cầu

- Thêm service `mysql` (image `mysql:8`, volume, healthcheck).
- Backend: JPA + MySQL driver, datasource từ env, giữ `/api/health`.
- Cập nhật `.env.example`, README, `docs/docker-run-guide.md`.
- Verify Docker stack và build Maven.

## 3. Phạm vi đã thực hiện

- `docker-compose.yml`: 3 services `mysql` → `backend` → `frontend`.
- Backend dependencies và config datasource.
- `HealthController`: thêm field `database: UP|DOWN`.
- Docs và env mẫu.
- Không tạo entity, migration, schema nghiệp vụ.

## 4. Danh sách file đã đọc

| File | Mục đích |
|------|----------|
| `docker-compose.yml` | Cấu hình hiện tại |
| `backend/pom.xml` | Dependencies |
| `backend/src/main/resources/application.yml` | Datasource |
| `backend/.../HealthController.java` | Health endpoint |
| `.env.example` | Biến DB |
| `.cursor/rules/db-rule.mdc` | Convention MySQL |

## 5. Danh sách file đã tạo/sửa

| File | Hành động |
|------|-----------|
| `docker-compose.yml` | Thêm `mysql`, volume `mysql_data`, depends_on |
| `.env.example` | Uncomment/bổ sung `MYSQL_*`, `SPRING_DATASOURCE_*` |
| `backend/pom.xml` | Thêm `spring-boot-starter-data-jpa`, `mysql-connector-j` |
| `backend/src/main/resources/application.yml` | Datasource + JPA `ddl-auto: none` |
| `backend/.../HealthController.java` | Verify DB connection qua `DataSource` |
| `README.md` | MySQL trong MVP status |
| `docs/docker-run-guide.md` | Service mysql, volume, troubleshooting |
| `docs/MYSQL_DOCKER_SETUP_001.md` | Report task này |

## 6. Thay đổi chính

### `docker-compose.yml`

```yaml
mysql:
  image: mysql:8
  volumes: [mysql_data:/var/lib/mysql]
  healthcheck: mysqladmin ping

backend:
  environment:
    SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/accessjobhub?...
  depends_on:
    mysql: { condition: service_healthy }
```

### `HealthController`

Response mẫu:

```json
{
  "service": "accessjob-hub-api",
  "timestamp": "2026-06-11T15:50:26Z",
  "database": "UP",
  "status": "UP"
}
```

## 7. Lý do thiết kế

- **Service name `mysql`**: backend không dùng `localhost` trong container.
- **Volume `mysql_data`**: giữ dữ liệu demo khi restart.
- **`ddl-auto: none`**: chưa có entity — tránh Hibernate tự tạo schema.
- **Không expose MySQL port**: theo security rule; debug qua `MYSQL_PORT` nếu cần.
- **Healthcheck đơn giản**: `mysqladmin ping` cho MySQL; giữ wget cho backend.

## 8. Accessibility impact

Không có — chỉ thay đổi infrastructure/backend health response.

## 9. Docker/runtime impact

| Thay đổi | Chi tiết |
|----------|----------|
| Services | `mysql` + `backend` + `frontend` (3 containers) |
| Volume | `accessjob-hub_mysql_data` |
| Startup order | mysql healthy → backend healthy → frontend |
| Image mới | Pull `mysql:8` (~132MB layer) lần đầu |
| Backend start | ~58s (JPA + Hikari connect MySQL) |

## 10. API impact

| Endpoint | Thay đổi |
|----------|----------|
| `GET /api/health` | Thêm field `database`; `status` vẫn `UP` khi DB connect được |

Không thêm endpoint nghiệp vụ.

## 11. Database impact

| Hạng mục | Trạng thái |
|----------|------------|
| MySQL container | Đã tích hợp |
| Database `accessjobhub` | Tạo tự động qua `MYSQL_DATABASE` |
| User `accessjob` | Tạo qua `MYSQL_USER` |
| Tables nghiệp vụ | **Chưa có** |
| Migration/Flyway | **Chưa có** |

## 12. Cách kiểm tra

```bash
git status
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs backend --tail=100
docker compose logs mysql --tail=100
curl http://localhost:8080/api/health
curl http://localhost:3000/api/health
cd backend && mvn clean package -DskipTests
docker compose down
```

## 13. Kết quả kiểm tra

| Lệnh | Kết quả |
|------|---------|
| `git status` | **Pass** — 7 file modified + report mới |
| `docker compose config` | **Pass** — exit 0 |
| `docker compose build` | **Pass** — exit 0 (~8 phút) |
| `docker compose up -d` | **Pass** — exit 0 (~10 phút, pull mysql:8) |
| `docker compose ps` | **Pass** — mysql healthy, backend healthy, frontend up |
| `docker compose logs backend` | **Pass** — `HikariPool-1 - Start completed`, `Started AccessJobHubApplication` |
| `docker compose logs mysql` | **Pass** — `ready for connections`, user `accessjob` created |
| `curl :8080/api/health` | **Pass** — `status: UP`, `database: UP` |
| `curl :3000/api/health` | **Pass** — proxy Nginx OK, `database: UP` |
| `mvn clean package -DskipTests` | **Pass** — BUILD SUCCESS |
| `docker compose down` | **Pass** — containers removed, volume giữ lại |

## 14. Rủi ro còn lại

- Backend start chậm (~45–60s) trên máy yếu — cần tăng `start_period` nếu healthcheck fail.
- `mvn spring-boot:run` local cần MySQL chạy sẵn hoặc profile H2 riêng.
- Chưa có schema/migration — task tiếp theo cần Flyway hoặc `schema.sql`.
- Password mẫu `change-me` — phải đổi trước deploy thật.

## 15. Đề xuất tiếp theo

1. Thêm Flyway migration cho 4 bảng MVP (`jobs`, `resources`, `applications`, `accessibility_feedback`).
2. Seed data demo.
3. Implement `GET /api/jobs` và trang danh sách việc làm.
