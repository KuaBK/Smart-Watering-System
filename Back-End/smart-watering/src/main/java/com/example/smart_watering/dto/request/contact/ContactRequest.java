package com.example.smart_watering.dto.request.contact;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class    ContactRequest {
    String fullName;
    String phone;
    String email;
    String content;
}
