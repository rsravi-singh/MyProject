package com.sunbeam.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.entity.Transaction;

import lombok.AllArgsConstructor;



@Service
@Transactional
@AllArgsConstructor
public class EmailService {
	
	private JavaMailSender mailSender;
	
	@Async
    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp + ". It is valid for 5 minutes.");
        try {
            mailSender.send(message);
        } catch (Exception e) {
            
            System.err.println("Failed to send OTP: " + e.getMessage());
        }
    }
	
	@Async
    public void sendTransactionEmail(String to, Transaction transaction) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Transaction Alert: " + transaction.getTransactionType());

        String body = String.format(
        	    "Dear %s,\n\n" +
        	    "We are pleased to inform you that a %s transaction has been successfully credited to your account.\n\n" +
        	    "Amount       : ₹%.2f\n" +
        	    "From Account : %s\n" +
        	    "Mode         : %s\n" +
        	    "Remarks      : %s\n\n" +
        	    "Thank you for banking with us.\n" +
        	    "Warm regards,\n" +
        	    "Your Bank Name",
        	    transaction.getAccountHolderName(),
        	    transaction.getTransactionType(),
        	    transaction.getAmount(),
        	    transaction.getReceiverAccount().getAccountNumber(),
        	    transaction.getTransactionMode(),
        	    transaction.getDescription()
        	);


        message.setText(body);

        try {
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send Transaction Email: " + e.getMessage());
        }
    }

}
