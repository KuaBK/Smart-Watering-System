package com.example.smart_watering.service;

import com.example.smart_watering.entity.History;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.repository.AccountRepository;
import com.example.smart_watering.repository.HistoryRepository;
import com.example.smart_watering.utils.JwtUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HistoryService {
    HistoryRepository historyRepository;
    AccountRepository accountRepository;
    JwtUtils jwtUtils;

    public void log(String action, String description) {
        Account account = accountRepository.findByEmail(jwtUtils.getCurrentUserEmail()).orElseThrow(() -> new RuntimeException("Invalid account"));
        History history = History.builder()
                .action(action)
                .description(description)
                .timestamp(LocalDateTime.now())
                .performedBy(account.getFirstName() + " " + account.getLastName())
                .build();

        historyRepository.save(history);
    }

    public List<History> getAllHistory() {
        return historyRepository.findAll();
    }
}
