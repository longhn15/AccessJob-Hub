# API Endpoints — AccessJob Hub

Base URL (Docker): `http://localhost:8080`  
Base URL (qua Nginx FE): `http://localhost:3000/api` (proxy tới backend)

### Front-end usage

- FE đọc API qua `VITE_API_URL` (mặc định `/api`).
- Dev (`npm run dev`): Vite proxy `/api` → `VITE_API_PROXY_TARGET` (mặc định `http://localhost:8080`).
- Docker: Nginx frontend proxy `/api/` → backend; không hardcode URL production trong bundle.
- Trang `/jobs` gọi `GET /api/jobs` với query `keyword`, `location`, `workType`, `remoteAvailable`.
- Trang `/jobs/:id` gọi `GET /api/jobs/{id}`; hiển thị message từ body khi 404.
- Trang `/resources` gọi `GET /api/resources` với query `keyword`, `category`.
- Trang `/resources/:id` gọi `GET /api/resources/{id}`.
- Trang `/jobs/:id` — form quan tâm gọi `POST /api/applications` với `jobId`, `fullName`, `email`, `phone?`, `message?`; map `fieldErrors` vào từng field; success giữ nguyên trang và reset form.
- Trang `/accessibility` — form phản hồi gọi `POST /api/accessibility-feedback` với `category`, `description`, `contactEmail?`; map `fieldErrors`; `ErrorSummary` khi ≥ 2 lỗi.

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

## Applications

### `POST /api/applications`

Gửi form quan tâm/ứng tuyển cho một việc làm **đang active**.

**Request body**

```json
{
  "jobId": 1,
  "fullName": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0900000000",
  "message": "Tôi quan tâm đến vị trí này."
}
```

| Field | Bắt buộc | Validation |
|-------|----------|------------|
| `jobId` | Có | Phải tồn tại và job phải active |
| `fullName` | Có | Không blank, tối đa 255 ký tự |
| `email` | Có | Đúng định dạng email |
| `phone` | Không | Tối đa 50 ký tự; chỉ số và `+`, `-`, `(`, `)` |
| `message` | Không | Tối đa 5000 ký tự |

**Response 201**

```json
{
  "id": 1,
  "message": "Thông tin quan tâm của bạn đã được ghi nhận.",
  "status": "pending",
  "createdAt": "2026-06-11T10:00:00Z"
}
```

**Response 400** — validation error

```json
{
  "message": "Dữ liệu gửi lên chưa hợp lệ.",
  "fieldErrors": [
    { "field": "email", "message": "Email không đúng định dạng." }
  ],
  "timestamp": "2026-06-11T10:00:00Z"
}
```

**Response 404** — job không tồn tại hoặc không active

```json
{
  "message": "Không tìm thấy việc làm phù hợp để gửi thông tin quan tâm.",
  "timestamp": "2026-06-11T10:00:00Z"
}
```

---

## Accessibility feedback

### `POST /api/accessibility-feedback`

Gửi phản hồi về khả năng tiếp cận của website.

**Request body**

```json
{
  "category": "keyboard",
  "description": "Tôi gặp khó khăn khi dùng phím Tab ở trang danh sách việc làm.",
  "contactEmail": "user@example.com"
}
```

| Field | Bắt buộc | Validation |
|-------|----------|------------|
| `category` | Có | Không blank, tối đa 100 ký tự |
| `description` | Có | Không blank, tối đa 5000 ký tự |
| `contactEmail` | Không | Nếu có thì đúng định dạng email |

**Response 201**

```json
{
  "id": 1,
  "message": "Cảm ơn bạn đã gửi phản hồi về khả năng tiếp cận.",
  "status": "pending",
  "createdAt": "2026-06-11T10:00:00Z"
}
```

**Response 400** — validation error (cùng format `fieldErrors` như Applications)

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
curl -X POST http://localhost:8080/api/applications \
  -H "Content-Type: application/json" \
  -d '{"jobId":1,"fullName":"Nguyễn Văn A","email":"user@example.com","phone":"0900000000","message":"Tôi quan tâm đến vị trí này."}'
curl -X POST http://localhost:8080/api/accessibility-feedback \
  -H "Content-Type: application/json" \
  -d '{"category":"keyboard","description":"Tôi gặp khó khăn khi dùng phím Tab ở trang danh sách việc làm.","contactEmail":"user@example.com"}'
```
