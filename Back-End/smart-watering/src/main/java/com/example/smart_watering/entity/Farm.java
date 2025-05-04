package com.example.smart_watering.entity;

import com.example.smart_watering.entity.account.Account;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Farm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String code;

    String name;
    String location;

    private LocalDate createdAt;

    String picture;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Account owner;

    LocalDateTime startDate;

    Boolean isActive;

    @JsonIgnore
    @OneToMany(mappedBy = "farm")
    List<FarmEmployee> employees;
}
