package com.example.smart_watering.dto.request.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountUpdateRequest {

    @Email
    String email;

    String firstName;

    String lastName;

    @Pattern(
            regexp = "^(03|05|07|08|09)\\d{8}$",
            message = "Phone number must be 10 digits and start with a valid prefix (03, 05, 07, 08, 09)")
    String phoneNumber;
}
