package com.example.smart_watering.dto.response.account;

import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetPasswordResponse {
    @Email
    String email;

    String newPassword;
    String confirmPassword;
}
