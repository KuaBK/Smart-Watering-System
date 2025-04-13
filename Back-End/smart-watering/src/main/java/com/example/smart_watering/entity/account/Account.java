package com.example.smart_watering.entity.account;

import com.example.smart_watering.entity.Farm;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @NotNull(message = "Email cannot be null")
    @Email
    @Column(unique = true, nullable = false)
    String email;

    String firstName;
    String lastName;
    String picture;


    @NotNull(message = "Password cannot be null")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    String password;

    @Enumerated(EnumType.STRING)
    Role role;

    @ManyToMany(mappedBy = "employees")
    private List<Farm> farms;
}
