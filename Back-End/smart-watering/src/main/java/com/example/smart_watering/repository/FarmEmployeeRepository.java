package com.example.smart_watering.repository;

import com.example.smart_watering.entity.FarmEmployee;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FarmEmployeeRepository extends JpaRepository<FarmEmployee, Long> {
    List<FarmEmployee> findByFarm(Farm farm);
    List<FarmEmployee> findByEmployee(Account employee);
    Optional<FarmEmployee> findByFarmAndEmployee(Farm farm, Account account);
}
