package com.example.smart_watering.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.smart_watering.dto.request.farm.FarmRequest;
import com.example.smart_watering.dto.response.farm.FarmEmployeeByFarmResponse;
import com.example.smart_watering.dto.response.farm.FarmResponse;
import com.example.smart_watering.entity.Farm;
import com.example.smart_watering.entity.FarmEmployee;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.exception.AppException;
import com.example.smart_watering.exception.ErrorCode;
import com.example.smart_watering.repository.AccountRepository;
import com.example.smart_watering.repository.FarmEmployeeRepository;
import com.example.smart_watering.repository.FarmRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FarmService {
    private final FarmRepository farmRepository;
    private final AccountRepository accountRepository;
    final FarmEmployeeRepository farmEmployeeRepository;
    final Cloudinary cloudinary;
    private final JavaMailSender mailSender;

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
        farm.setCode("Farm-" + (farmRepository.count() + 1));
        farm.setIsActive(false);

        Account owner = accountRepository.findById(dto.getOwnerId())
                .orElse(null);
        if (owner == null) {
            farm.setStartDate(null);
        } else {
            farm.setStartDate(LocalDateTime.now());
        }
        farm.setOwner(owner);
        farm.setEmployees(new ArrayList<>());

        farm = farmRepository.save(farm);

        return toResponseDto(farm);
    }

    @Transactional
    public boolean delete(Long id) {
        Farm farm = farmRepository.findById(id).orElseThrow(() -> new RuntimeException("Farm not found"));
        if(farm != null) {
        farmEmployeeRepository.deleteByFarm(farm);
        farmRepository.deleteById(id);
        return true;
        }
        else return false;
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
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        Account employee = accountRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (farmEmployeeRepository.findByFarmAndEmployee(farm, employee).isPresent()) {
            throw new RuntimeException("Employee already in farm");
        }

        FarmEmployee fe = FarmEmployee.builder()
                .farm(farm)
                .employee(employee)
                .employeeName(employee.getFirstName() + " " + employee.getLastName())
                .startWorkingDate(LocalDate.now())
                .build();

        farmEmployeeRepository.save(fe);
        try {
            sendGardenNotificationEmail(employee.getEmail(), farm.getName(), true);
        }  catch (MessagingException e) {
            log.error("Failed to send email: " + e.getMessage());
        }
    }


    public void removeEmployeeFromFarm(Long farmId, String employeeId) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        Account employee = accountRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        FarmEmployee fe = farmEmployeeRepository.findByFarmAndEmployee(farm, employee)
                .orElseThrow(() -> new RuntimeException("Employee not in farm"));

        farmEmployeeRepository.delete(fe);
        try {
            sendGardenNotificationEmail(employee.getEmail(), farm.getName(), false);
        }  catch (MessagingException e) {
            log.error("Failed to send email: " + e.getMessage());
        }
    }

    public void sendEmail(@Email String to, String subject, String text) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);
        helper.setFrom("tuanphonglqd@gmail.com");

        mailSender.send(message);
    }

    public void sendGardenNotificationEmail(String email, String gardenName, boolean added) throws MessagingException {
        String subject = added ? "You've been added to a garden" : "You've been removed from a garden";
        String message = added
                ? String.format("Hi,%n%nYou have been added to the garden: %s.%nWelcome and happy planting! 🌱", gardenName)
                : String.format("Hi,%n%nYou have been removed from the garden: %s.%nHope to see you again!", gardenName);

        sendEmail(email, subject, message);
    }

    public List<Account> getEmployeesNotInFarm(Long farmId) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        List<Account> existingEmployees = farm.getEmployees().stream()
                .map(FarmEmployee::getEmployee)
                .toList();

        return accountRepository.findAllNotInFarm(farm.getOwner(), existingEmployees);
    }


    private FarmResponse toResponseDto(Farm farm) {
        String ownerName = null;
        String ownerAddress = null;
        String ownerPhone = null;
        if (farm.getOwner() != null) {
            ownerName = farm.getOwner().getFirstName() + " " + farm.getOwner().getLastName();
            ownerAddress = farm.getOwner().getAddress();
            ownerPhone = farm.getOwner().getPhoneNumber();
        }
        List<FarmEmployeeByFarmResponse> employeeResponses = farm.getEmployees() == null ? List.of()
                : farm.getEmployees().stream()
                .map(emp -> FarmEmployeeByFarmResponse.builder()
                        .id(emp.getId())
                        .employeeId(emp.getEmployee().getId())
                        .employeeName(emp.getEmployeeName())
                        .employeeEmail(emp.getEmployee().getEmail())
                        .startWorkingDate(emp.getStartWorkingDate())
                        .build())
                .toList();
        return FarmResponse.builder()
                .id(farm.getId())
                .code(farm.getCode())
                .name(farm.getName())
                .location(farm.getLocation())
                .createdAt(farm.getCreatedAt())
                .ownerName(ownerName)
                .ownerAddress(ownerAddress)
                .ownerPhoneNumber(ownerPhone)
                .startDate(farm.getStartDate())
                .isActive(farm.getIsActive())
                .employee(employeeResponses)
                .build();
    }
}
