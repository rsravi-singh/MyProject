package com.sunbeam.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/home")
@AllArgsConstructor
public class HomeController {
	
	@GetMapping("/loan-rates")
    public ResponseEntity<?> getLoanRates() {
        // logic to fetch loan rates
        return ResponseEntity.ok(Map.of(
            "type", "loan",
            "rates", List.of("Personal Loan - 12%", "Home Loan - 9.5%")
        ));
    }
	
	
	@GetMapping("/fd-rates")
    public ResponseEntity<?> getFdRates() {
        // logic to fetch FD rates
        return ResponseEntity.ok(Map.of(
            "type", "fd",
            "rates", List.of("1 Year - 6.5%", "5 Years - 7.5%")
        ));
    }

}
