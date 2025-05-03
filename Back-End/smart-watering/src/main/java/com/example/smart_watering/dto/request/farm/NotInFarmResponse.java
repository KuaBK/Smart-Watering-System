package com.example.smart_watering.dto.request.farm;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotInFarmResponse {
    private String id;
    private String fullName;
    private String email;
}
