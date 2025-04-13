package com.example.smart_watering.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;


import com.example.smart_watering.dto.request.account.AccountCreationRequest;
import com.example.smart_watering.dto.request.account.AccountUpdateRequest;
import com.example.smart_watering.dto.response.ApiResponse;
import com.example.smart_watering.dto.response.account.AccountResponse;
import com.example.smart_watering.dto.response.authentication.AuthenticationResponse;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.entity.account.PasswordResetToken;
import com.example.smart_watering.entity.account.Role;
import com.example.smart_watering.exception.AppException;
import com.example.smart_watering.exception.ErrorCode;
import com.example.smart_watering.repository.AccountRepository;
import com.example.smart_watering.repository.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;

    private static final Random RANDOM = new Random();

    public AccountResponse createAccount(AccountCreationRequest accountRequest) {
        Optional<Account> account = accountRepository.findByEmail(accountRequest.getEmail());
        if (account.isPresent()) {
            throw  new AppException(ErrorCode.USER_EXISTED);
        }

        Account validAccount = Account.builder()
                .role(Role.FARMER)
                .email(accountRequest.getEmail())
                .firstName(accountRequest.getFirstName())
                .lastName(accountRequest.getLastName())
                .phoneNumber(accountRequest.getPhoneNumber())
                .build();
        validAccount.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
        Account savedAccount = accountRepository.save(validAccount);

        return mapToAccountResponse(savedAccount);
    }

    public List<AccountResponse> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map(this::mapToAccountResponse).toList();
    }

    public Optional<AccountResponse> getAccountById(String id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.map(this::mapToAccountResponse);
    }

    public AccountResponse updateAccount(String id, AccountUpdateRequest accountRequest) {
        Optional<Account> accountOpt = accountRepository.findById(id);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            if(passwordEncoder.matches(accountRequest.getOldPassword(), account.getPassword()) &&
               accountRequest.getConfirmPassword().equals(accountRequest.getNewPassword())) {

                account.setPassword(passwordEncoder.encode(accountRequest.getNewPassword()));
            }
            else {throw new AppException(ErrorCode.WRONG_PASSWORD);}
            Account updatedAccount = accountRepository.save(account);
            return mapToAccountResponse(updatedAccount);
        }
        return null;
    }

    public boolean deleteAccount(String id) {
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private AccountResponse mapToAccountResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .email(account.getEmail())
                .role(account.getRole().name())
                .build();
    }

    public String sendResetCode(@Email String email) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            return "Email is not exist!";
        }

        String otp = String.format("%06d", RANDOM.nextInt(1000000));
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(10);

        Optional<PasswordResetToken> existingTokenOpt = tokenRepository.findByEmail(email);

        if (existingTokenOpt.isPresent()) {
            PasswordResetToken existingToken = existingTokenOpt.get();
            existingToken.setToken(otp);
            existingToken.setExpiryDate(expiryTime);
            tokenRepository.save(existingToken);
        } else {
            PasswordResetToken token = new PasswordResetToken(email, otp, expiryTime);
            tokenRepository.save(token);
        }

        sendEmail(email, "Forgot password - OTP Code", "Your OTP Code: " + otp);

        return "OTP Code has been sent";
    }

    public void sendEmail(@Email String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public ApiResponse<String> confirmOTP(String otp, @Email String email){
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByEmailAndToken(email, otp);
        if (tokenOpt.isEmpty() || tokenOpt.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return new ApiResponse<>(400, "Invalid or expired OTP", null);
        }
        return new ApiResponse<>(200, "Valid OTP", null);
    }

    @Transactional
    public String resetPassword(@Email String email, String newPassword, String confirmPassword) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isEmpty()) {
            return "Email is not exist!";
        }

        Account account = accountOpt.get();
        if(newPassword.equals(confirmPassword)) {
            account.setPassword(passwordEncoder.encode(newPassword));
            accountRepository.save(account);
            tokenRepository.deleteByEmail(email);
            return "Successful";
        }
        else {return "Password isn't match";}
    }
}


// @PreAuthorize("hasRole('ADMIN')")
// @PostAuthorize("returnObject.username == authentication.name")
