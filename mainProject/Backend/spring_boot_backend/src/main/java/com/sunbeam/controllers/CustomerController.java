package com.sunbeam.controllers;

import java.util.Collections;
import java.util.Map;

import javax.naming.AuthenticationException;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PutExchange;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.UserAuth;
import com.sunbeam.security.CustomUserDetailsServiceImpl;
import com.sunbeam.security.JwtUtils;
import com.sunbeam.service.CustomerService;
import com.sunbeam.service.EmailService;
import com.sunbeam.service.OtpService;
import com.sunbeam.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/customer")
@AllArgsConstructor
public class CustomerController {

	private CustomerService customerInfoService;
	private CustomerDao customerdao;

	@GetMapping("/dashboard")
	public ResponseEntity<?> getCustomerDashboard(@AuthenticationPrincipal UserAuth userAuth) {
		System.out.println("Fetching customer dashboard...");
		// Get customer ID from authenticated user
		try {
			// Ensure the user is logged in
			if (userAuth == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated"));
			}
			// Get customer ID from authenticated user
			Long customerId = customerInfoService.getCustomerIdFromUserDetails(userAuth);
			if (customerId == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Customer record not found"));
			}
			return ResponseEntity.ok(customerInfoService.getCustomerDashboard(customerId));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid authentication"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Failed to fetch dashboard data"));
		}
	}

	@PostMapping("/applycard")
	public ResponseEntity<?> getCustomerCard(@AuthenticationPrincipal UserDetails userDetails) {
		if (userDetails == null) {
			System.out.println("FAILURE: UserDetails is null");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		System.out.println("SUCCESS: User email - " + userDetails.getUsername());
		// Get customer ID from authenticated user
		try {
			// Get authenticated username/email
			String username = userDetails.getUsername();

			// Find customer by auth email
			Customer customer = customerdao.findByAuth_Email(username)
					.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

			// Process card application
			ApiResponse response = customerInfoService.getCustomerCard(customer.getId());

			return ResponseEntity.ok(response);
		} catch (ResourceNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(ex.getMessage()));
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse("Error processing card application"));
		}
	}

	@DeleteMapping("/delete/{id}")
	ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
		System.out.println("get delete"+ id);
		try {
			 Customer cust = customerdao.findById(id)
				        .orElseThrow(() -> new ResourceNotFoundException("customer not found"));
			 ApiResponse deleted = customerInfoService.deleteCustomerAndAccount(id);

	        if (deleted != null) {
	            return ResponseEntity
	                    .status(HttpStatus.OK) // No content in body for success
	                    .build();
	        } else {
	            return ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body(Map.of("error", "Customer with ID " + id + " not found"));
	        }
	    }catch (SecurityException ex) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("error", "Not authorized to delete this customer"));
	    } catch (Exception ex) {
	        return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("error", "Error deleting customer"));
	    }
	}
	
	@PutMapping("/activate/{id}")
	ResponseEntity<?> activateCustomer(@PathVariable Long id) {
		System.out.println("get activate"+ id);
		try {
			 Customer cust = customerdao.findById(id)
				        .orElseThrow(() -> new ResourceNotFoundException("customer not found"));
			 ApiResponse deleted = customerInfoService.activateCustomerAndAccount(id);

	        if (deleted != null) {
	            return ResponseEntity
	                    .status(HttpStatus.OK) // No content in body for success
	                    .build();
	        } else {
	            return ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body(Map.of("error", "Customer with ID " + id + " not found"));
	        }
	    }catch (SecurityException ex) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("error", "Not authorized to activate this customer"));
	    } catch (Exception ex) {
	        return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("error", "Error activating customer"));
	    }
	}

}
