package com.example.smart_watering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SmartWateringApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartWateringApplication.class, args);
	}

}
