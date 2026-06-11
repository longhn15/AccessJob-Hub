# API Endpoints — AccessJob Hub

Base URL (Docker): `http://localhost:8080`  
Base URL (qua Nginx FE): `http://localhost:3000/api` (proxy tới backend)

## Health

### `GET /api/health`

Kiểm tra trạng thái API và database.

**Response 200**

```json
{
  "service": "accessjob-hub-api",
  "timestamp": "2026-06-11T10:00:00Z",
  "database": "UP",
  "status": "UP"
}
```

---

## Jobs (read-only)

### `GET /api/jobs`

Danh sách việc làm **đang active**.

**Query params (optional)**

| Param | Mô tả |
|-------|--------|
| `keyword` | Tìm trong title, company, mô tả ngắn/đầy đủ, yêu cầu (không phân biệt hoa thường) |
| `location` | Lọc theo địa điểm (contains, không phân biệt hoa thường) |
| `workType` | Khớp chính xác (`full-time`, `part-time`, …) |
| `remoteAvailable` | `true` / `false` |
| `limit` | Số bản ghi tối đa (mặc định **20**, tối đa **100**) |

**Sort:** `createdAt` giảm dần (mới nhất trước), tie-break `id` giảm dần.

**Response 200** — mảng `JobResponse`

```json
[
  {
    "id": 1,
    "title": "Nhân viên hỗ trợ khách hàng",
    "companyName": "Công ty TNHH Tiếp cận Số",
    "location": "Hà Nội",
    "workType": "full-time",
    "remoteAvailable": true,
    "accessibilitySupport": "...",
    "shortDescription": "...",
    "fullDescription": "...",
    "requirements": "...",
    "contactEmail": "tuyendung@tiepcanso.vn",
    "createdAt": "2026-06-11T10:00:00Z",
    "updatedAt": "2026-06-11T10:00:00Z"
  }
]
```

### `GET /api/jobs/{id}`

Chi tiết một việc làm **active**.

**Response 200** — một `JobResponse`

**Response 404**

```json
{
  "message": "Không tìm thấy việc làm phù hợp.",
  "timestamp": "2026-06-11T10:00:00Z"
}
```

---

## Resources (read-only)

### `GET /api/resources`

Danh sách tài nguyên **đang active**.

**Query params (optional)**

| Param | Mô tả |
|-------|--------|
| `category` | Lọc theo category (contains, không phân biệt hoa thường) |
| `keyword` | Tìm trong title và description |
| `limit` | Mặc định **20**, tối đa **100** |

**Sort:** `createdAt` giảm dần, tie-break `id` giảm dần.

**Response 200** — mảng `ResourceResponse`

```json
[
  {
    "id": 1,
    "title": "WCAG 2.2 — Tổng quan tiêu chuẩn",
    "category": "Tiêu chuẩn web",
    "description": "...",
    "url": "https://www.w3.org/WAI/standards-guidelines/wcag/",
    "createdAt": "2026-06-11T10:00:00Z",
    "updatedAt": "2026-06-11T10:00:00Z"
  }
]
```

### `GET /api/resources/{id}`

Chi tiết một tài nguyên **active**.

**Response 404**

```json
{
  "message": "Không tìm thấy tài nguyên phù hợp.",
  "timestamp": "2026-06-11T10:00:00Z"
}
```

---

## Ví dụ curl

```bash
curl http://localhost:8080/api/jobs
curl "http://localhost:8080/api/jobs?keyword=Frontend"
curl "http://localhost:8080/api/jobs?location=Hà%20Nội"
curl "http://localhost:8080/api/jobs?workType=full-time"
curl "http://localhost:8080/api/jobs?remoteAvailable=true"
curl http://localhost:8080/api/jobs/1
curl http://localhost:8080/api/resources
curl "http://localhost:8080/api/resources?category=Tiêu%20chuẩn"
curl "http://localhost:8080/api/resources?keyword=WCAG"
curl http://localhost:8080/api/resources/1
```
