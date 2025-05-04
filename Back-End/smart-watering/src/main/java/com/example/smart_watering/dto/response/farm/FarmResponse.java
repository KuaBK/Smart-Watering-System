package com.example.smart_watering.dto.response.farm;

import com.example.smart_watering.entity.FarmEmployee;
import com.example.smart_watering.entity.account.Account;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate createdAt;

    private String ownerName;
    private String ownerPhoneNumber;
    private String ownerAddress;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss dd-MM-yyyy")
    LocalDateTime startDate;

    Boolean isActive;

    private List<FarmEmployee> employee;
}
