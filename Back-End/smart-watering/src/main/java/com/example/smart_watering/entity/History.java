package com.example.smart_watering.entity;

import com.example.smart_watering.entity.account.Account;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String action;

    String description;

    LocalDateTime timestamp;

    String performedBy;
}
