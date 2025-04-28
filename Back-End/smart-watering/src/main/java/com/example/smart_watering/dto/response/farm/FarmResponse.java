package com.example.smart_watering.dto.response.farm;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FarmResponse {
    private Long id;
    private String code;
    private String name;
    private String location;
    private LocalDate createdAt;
    private String ownerFarmName;
    private List<String> employeeNames;
}
