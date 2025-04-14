package com.example.smart_watering.controller;

import com.example.smart_watering.dto.request.farm.FarmRequest;
import com.example.smart_watering.dto.response.ApiResponse;
import com.example.smart_watering.dto.response.farm.FarmResponse;
import com.example.smart_watering.entity.Farm;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.service.FarmService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if(farmService.delete(id)){
        return ResponseEntity.ok("Delete Successfully");}
        return ResponseEntity.badRequest().body("Delete Failed");
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

    @PostMapping("/{id}/avatar")
    public ApiResponse<String> updateAvatar(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
        farmService.updatePicture(id, image);
        return new ApiResponse<>(200, "Update farm success", null);
    }

    @GetMapping("/{id}/outsiders")
    public ApiResponse<List<String>> getPeopleNotInFarm(@PathVariable Long id) {

        List<Account> outsiders = farmService.getEmployeesNotInFarm(id);
        List<String> outsiderNames = outsiders.stream()
                .map(account -> account.getFirstName() + " " + account.getLastName())
                .toList();

        return new ApiResponse<>(200, "People not in this farm", outsiderNames);
    }
}
