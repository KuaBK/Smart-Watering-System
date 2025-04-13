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
    private String name;
    private String location;
    private LocalDate createdAt;
    private String ownerId;
    private List<String> employeeIds;
}
