package com.sunbeam.service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OtpService {
	
	private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStorage.put(email, otp);

        
        scheduler.schedule(() -> otpStorage.remove(email), 5, TimeUnit.MINUTES);

        return otp;
    }

    public boolean validateOtp(String email, String otp) {
        return otp.equals(otpStorage.get(email));
    }

}
