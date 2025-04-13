package com.example.smart_watering.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.smart_watering.dto.request.farm.FarmRequest;
import com.example.smart_watering.dto.response.farm.FarmResponse;
import com.example.smart_watering.entity.Farm;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.exception.AppException;
import com.example.smart_watering.exception.ErrorCode;
import com.example.smart_watering.repository.AccountRepository;
import com.example.smart_watering.repository.FarmRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FarmService {
    private final FarmRepository farmRepository;
    private final AccountRepository accountRepository;
    final Cloudinary cloudinary;

    public FarmResponse create(FarmRequest dto) {
        Farm farm = new Farm();
        return saveAndReturn(farm, dto);
    }

    public String updatePicture(Long id, MultipartFile file) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Farm not found"));
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", "avatars"));

            String imageUrl = uploadResult.get("secure_url").toString();
            farm.setPicture(imageUrl);
            farmRepository.save(farm);

            return imageUrl;

        } catch (IOException e) {
            throw new AppException(ErrorCode.FARM_NOT_FOUND);
        }
    }

    public FarmResponse update(Long id, FarmRequest dto) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.FARM_NOT_FOUND));
        return saveAndReturn(farm, dto);
    }

    private FarmResponse saveAndReturn(Farm farm, FarmRequest dto) {
        farm.setName(dto.getName());
        farm.setLocation(dto.getLocation());
        farm.setCreatedAt(dto.getCreatedAt());

        Account owner = accountRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        farm.setOwner(owner);

        List<Account> employees = accountRepository.findAllById(dto.getEmployeeIds());
        farm.setEmployees(employees);

        farmRepository.save(farm);
        return toResponseDto(farm);
    }

    public void delete(Long id) {
        farmRepository.deleteById(id);
    }

    public FarmResponse getById(Long id) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.FARM_NOT_FOUND));
        return toResponseDto(farm);
    }

    public List<FarmResponse> getAll() {
        return farmRepository.findAll()
                .stream().map(this::toResponseDto)
                .toList();
    }

    public void addEmployeeToFarm(Long farmId, String employeeId) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new AppException(ErrorCode.FARM_NOT_FOUND));

        Account employee = accountRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!farm.getEmployees().contains(employee)) {
            farm.getEmployees().add(employee);
            farmRepository.save(farm);
        }
    }

    public void removeEmployeeFromFarm(Long farmId, String employeeId) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new AppException(ErrorCode.FARM_NOT_FOUND));

        Account employee = accountRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (farm.getEmployees().contains(employee)) {
            farm.getEmployees().remove(employee);
            farmRepository.save(farm);
        }
    }


    private FarmResponse toResponseDto(Farm farm) {
        return FarmResponse.builder()
                .id(farm.getId())
                .name(farm.getName())
                .location(farm.getLocation())
                .createdAt(farm.getCreatedAt())
                .ownerEmail(farm.getOwner().getEmail())
                .employeeEmails(farm.getEmployees().stream()
                        .map(Account::getEmail)
                        .toList())
                .build();
    }
}
