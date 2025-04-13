package com.example.smart_watering.dto.request.account;

import com.example.smart_watering.entity.account.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountCreationRequest {
    @Size(min = 8, message = "Password must be at least 8 characters long")
    String password;

    @Email
    String email;
}
