package com.accessjobhub.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

public record ApiErrorResponse(
        String message,
        @JsonInclude(JsonInclude.Include.NON_NULL) List<FieldErrorDetail> fieldErrors,
        Instant timestamp
) {
    public record FieldErrorDetail(String field, String message) {
    }

    public static ApiErrorResponse of(String message) {
        return new ApiErrorResponse(message, null, Instant.now());
    }

    public static ApiErrorResponse validation(List<FieldErrorDetail> fieldErrors) {
        return new ApiErrorResponse("Dữ liệu gửi lên chưa hợp lệ.", fieldErrors, Instant.now());
    }
}
