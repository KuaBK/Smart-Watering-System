package com.example.smart_watering.dto.request.farm;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FarmRequest {
    String name;
    String location;
    LocalDate createdAt = LocalDate.now();
    String ownerId;
    List<String> employeeIds;
}
