package com.example.smart_watering.repository;

import java.util.List;
import java.util.Optional;

import com.example.smart_watering.entity.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT a FROM Account a " +
            "WHERE a <> :owner AND a NOT IN :employees")
    List<Account> findAllNotInFarm(@Param("owner") Account owner, @Param("employees") List<Account> employees);
}
