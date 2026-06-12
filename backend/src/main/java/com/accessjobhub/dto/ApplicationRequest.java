package com.accessjobhub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ApplicationRequest(
        @NotNull(message = "Vui lòng chọn việc làm.")
        Long jobId,

        @NotBlank(message = "Họ và tên không được để trống.")
        @Size(max = 255, message = "Họ và tên không được vượt quá 255 ký tự.")
        String fullName,

        @NotBlank(message = "Email không được để trống.")
        @Email(message = "Email không đúng định dạng.")
        @Size(max = 255, message = "Email không được vượt quá 255 ký tự.")
        String email,

        @Size(max = 50, message = "Số điện thoại không được vượt quá 50 ký tự.")
        @Pattern(
                regexp = "^(|[0-9+\\-\\s()]{3,50})$",
                message = "Số điện thoại chỉ được chứa số và các ký tự +, -, (, )."
        )
        String phone,

        @Size(max = 5000, message = "Nội dung tin nhắn không được vượt quá 5000 ký tự.")
        String message
) {
}
