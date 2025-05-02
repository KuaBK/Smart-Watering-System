package com.example.smart_watering.dto.response.account;

import com.example.smart_watering.entity.account.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountResponse {
    String id;
    String email;
    String firstName;
    String lastName;
    String address;
    String phoneNumber;
    String picture;
    Role role;
}
