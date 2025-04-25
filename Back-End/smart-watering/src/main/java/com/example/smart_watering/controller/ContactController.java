package com.example.smart_watering.controller;

import com.example.smart_watering.dto.request.contact.ContactRequest;
import com.example.smart_watering.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ContactController {
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendContact(@RequestBody ContactRequest request) {
        emailService.sendContactMail(request);
        return ResponseEntity.ok("Gửi email thành công!");
    }
}
