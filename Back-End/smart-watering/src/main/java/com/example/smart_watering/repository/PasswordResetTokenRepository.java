package com.example.smart_watering.repository;

import com.example.smart_watering.entity.account.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByEmailAndToken(String email, String token);
    void deleteByEmail(String email);
    Optional<PasswordResetToken> findByEmail(String email);
}

