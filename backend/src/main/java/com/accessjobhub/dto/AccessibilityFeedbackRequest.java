package com.accessjobhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AccessibilityFeedbackRequest(
        @NotBlank(message = "Danh mục phản hồi không được để trống.")
        @Size(max = 100, message = "Danh mục phản hồi không được vượt quá 100 ký tự.")
        String category,

        @NotBlank(message = "Mô tả phản hồi không được để trống.")
        @Size(max = 5000, message = "Mô tả phản hồi không được vượt quá 5000 ký tự.")
        String description,

        @Size(max = 255, message = "Email liên hệ không được vượt quá 255 ký tự.")
        @Pattern(
                regexp = "^(|[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,})$",
                message = "Email không đúng định dạng."
        )
        String contactEmail
) {
}
