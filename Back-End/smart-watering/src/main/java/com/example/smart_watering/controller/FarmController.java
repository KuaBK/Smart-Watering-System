package com.example.smart_watering.controller;

import com.example.smart_watering.dto.request.farm.FarmRequest;
import com.example.smart_watering.dto.response.ApiResponse;
import com.example.smart_watering.dto.response.farm.FarmResponse;
import com.example.smart_watering.service.FarmService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farm")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FarmController {
    private final FarmService farmService;

    @PostMapping
    public ApiResponse<FarmResponse> create(@RequestBody FarmRequest dto) {
        FarmResponse response = farmService.create(dto);
        return new ApiResponse<>(
                200, "Create farm success", response
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<FarmResponse> update(@PathVariable Long id, @RequestBody FarmRequest dto) {
        FarmResponse response = farmService.update(id, dto);
        return new ApiResponse<>(
                200, "Update farm success", response
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        farmService.delete(id);
    }

    @GetMapping("/{id}")
    public ApiResponse<FarmResponse> getById(@PathVariable Long id) {
        FarmResponse response = farmService.getById(id);
        return new ApiResponse<>(
                200, "Get farm success", response
        );
    }

    @GetMapping
    public ApiResponse<List<FarmResponse>> getAll() {
        List<FarmResponse> farmResponses = farmService.getAll();
        return new ApiResponse<>(
                200, "Get farm success", farmResponses
        );
    }

    @PostMapping("/{farmId}/add/{employeeId}")
    public ApiResponse<String> addEmployee(@PathVariable Long farmId,
                                              @PathVariable String employeeId) {
        farmService.addEmployeeToFarm(farmId, employeeId);
        return new ApiResponse<>(200, "Employee added to farm", null);
    }

    @PostMapping("/{farmId}/remove/{employeeId}")
    public ApiResponse<String> removeEmployee(@PathVariable Long farmId,
                                                 @PathVariable String employeeId) {
        farmService.removeEmployeeFromFarm(farmId, employeeId);
        return new ApiResponse<>(200, "Employee removed from farm", null);
    }
}
