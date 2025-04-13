package com.example.smart_watering.entity;

import com.example.smart_watering.entity.account.Account;
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

    String name;
    String location;

    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Account owner;

    @ManyToMany
    @JoinTable(
            name = "farm_employee",
            joinColumns = @JoinColumn(name = "farm_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<Account> employees;
}
