package com.example.smart_watering.controller;

import com.example.smart_watering.dto.response.ApiResponse;
import com.example.smart_watering.entity.History;
import com.example.smart_watering.service.HistoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/log")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HistoryController {
    HistoryService historyService;

    @GetMapping("/all")
    public ApiResponse<List<History>> getListHistory(){
        List<History> response = historyService.getAllHistory();
        return new ApiResponse<>(200, "Get all history successfully", response);
    }
}
