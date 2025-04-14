package com.example.smart_watering.controller;

import java.util.List;
import java.util.Optional;

import com.example.smart_watering.dto.request.account.AccountCreationRequest;
import com.example.smart_watering.dto.request.account.AccountUpdateRequest;
import com.example.smart_watering.dto.request.account.PasswordUpdateRequest;
import com.example.smart_watering.dto.response.ApiResponse;
import com.example.smart_watering.dto.response.account.AccountResponse;
import com.example.smart_watering.dto.response.account.ResetPasswordResponse;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.repository.AccountRepository;
import com.example.smart_watering.service.AccountService;
import com.example.smart_watering.utils.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AccountController {
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    final JwtUtils jwtUtils;

    private static final String ACCOUNT_NOT_FOUND = "Account not found";

    // Create Account
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<AccountResponse>> createAccount(
            @Valid @RequestBody AccountCreationRequest accountRequest) {
        AccountResponse createdAccount = accountService.createAccount(accountRequest);
        ApiResponse<AccountResponse> response = ApiResponse.<AccountResponse>builder()
                .message("Account created successfully")
                .result(createdAccount)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all Accounts
    @GetMapping
    public ResponseEntity<ApiResponse<List<AccountResponse>>> getAllAccounts() {
        List<AccountResponse> accounts = accountService.getAllAccounts();
        ApiResponse<List<AccountResponse>> response = ApiResponse.<List<AccountResponse>>builder()
                .message("Fetched all accounts successfully")
                .result(accounts)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Get Account by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccountById(@PathVariable String id) {
        Optional<AccountResponse> account = accountService.getAccountById(id);
        if (account.isPresent()) {
            ApiResponse<AccountResponse> response = ApiResponse.<AccountResponse>builder()
                    .message("Account fetched successfully")
                    .result(account.get())
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        ApiResponse<AccountResponse> response = ApiResponse.<AccountResponse>builder()
                .message(ACCOUNT_NOT_FOUND)
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Update Account
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> updateAccount(
            @PathVariable String id, @RequestBody PasswordUpdateRequest accountRequest) {
        AccountResponse updatedAccount = accountService.updatePassword(id, accountRequest);
        if (updatedAccount != null) {
            ApiResponse<AccountResponse> response = ApiResponse.<AccountResponse>builder()
                    .message("Account updated successfully")
                    .result(updatedAccount)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        ApiResponse<AccountResponse> response = ApiResponse.<AccountResponse>builder()
                .message(ACCOUNT_NOT_FOUND)
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/myInfo")
    public ResponseEntity<ApiResponse<AccountResponse>> getMyAccounts() {
        Account account = accountRepository.findByEmail(jwtUtils.getCurrentUserEmail()).orElseThrow(
                () -> new RuntimeException(ACCOUNT_NOT_FOUND)
        );
        AccountResponse response = AccountResponse.builder()
                .id(account.getId())
                .email(account.getEmail())
                .phoneNumber(account.getPhoneNumber())
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .picture(account.getPicture())
                .role(account.getRole())
                .build();
//        response.setNoPassword(!StringUtils.hasText(account.getPassword()));
        return ResponseEntity.ok(new  ApiResponse<>(200, "Your info", response));
    }

    // Delete Account
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@PathVariable String id) {
        boolean isDeleted = accountService.deleteAccount(id);
        ApiResponse<Void> response;
        if (isDeleted) {
            response = ApiResponse.<Void>builder()
                    .message("Account deleted successfully")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response = ApiResponse.<Void>builder()
                    .message(ACCOUNT_NOT_FOUND)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/avatar")
    public ResponseEntity<String> updateAvatar(
            @PathVariable String id,
            @RequestParam("image") MultipartFile image) {
        String imageUrl = accountService.updateAvatar(id, image);
        return ResponseEntity.ok(imageUrl);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Account> updateAccountInfo(
            @PathVariable String id,
            @RequestBody @Valid AccountUpdateRequest request) {
        Account updated = accountService.updateAccountInfo(id, request);
        return ResponseEntity.ok(updated);
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> sendResetCode(@RequestParam String email) {
        if(accountRepository.findByEmail(email).isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        String message = accountService.sendResetCode(email);
        return ResponseEntity.ok(new ApiResponse<>(200, message, null));
    }

    @PostMapping("/confirm-otp")
    public ResponseEntity<ApiResponse<String>> confirmOtp(@RequestParam String otp, @RequestParam String email) {
        return ResponseEntity.ok(accountService.confirmOTP(otp, email));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordResponse response) {
        return ResponseEntity.ok(accountService.resetPassword(response));
    }
}
