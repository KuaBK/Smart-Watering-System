package com.example.smart_watering.service;

import com.example.smart_watering.dto.request.contact.ContactRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class EmailService {
    final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String adminEmail;

    public void sendContactMail(ContactRequest request) {
        String subject = "Yêu cầu liên hệ từ người dùng: " + request.getFullName();

        String time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy"));
        String body = String.format(
                "Họ tên: %s\nSĐT: %s\nEmail: %s\nThời gian gửi: %s\n\nNội dung:\n%s",
                request.getFullName(),
                request.getPhone(),
                request.getEmail(),
                time,
                request.getContent()
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(adminEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
