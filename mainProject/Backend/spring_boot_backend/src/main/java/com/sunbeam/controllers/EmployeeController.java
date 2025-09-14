package com.sunbeam.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.custom_exceptions.DuplicateResourceException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dto.AdminCustomerResponseDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CustomerInfoDTO;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.entity.UserAuth;
import com.sunbeam.service.AdminService;
import com.sunbeam.service.CustomerService;
import com.sunbeam.service.EmployeeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/employee")
@AllArgsConstructor
public class EmployeeController {

	private final EmployeeService employeeService;
	private final AdminService adminService;
	private final CustomerService customerservice;

	@PostMapping("/employeecreate")
	ResponseEntity<?> createEmployee(@RequestBody EmployeeResponseDTO dto) {
		System.out.println("employee created" + dto);
		try {
			ApiResponse employeeId = employeeService.createEmployee(dto);

			return ResponseEntity.status(HttpStatus.CREATED)
					.body(Map.of("message", "Employee created successfully", "employeeId", employeeId));

		} catch (DuplicateResourceException ex) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Employee already exists"));
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
		} catch (SecurityException ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("error", "Not authorized to create employees"));
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Error creating employee"));
		}
	}

	@GetMapping("/allcustomer")
	ResponseEntity<?> getAllCustomer() {
		System.out.println("get all customer");
		List<AdminCustomerResponseDTO> customers = adminService.listCustomersOrderbydate();

		if (customers.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			// 204 - No content, no error, just empty list
		}

		return ResponseEntity.ok(customers); // 200 - Found customers
	}

	@GetMapping("/allpendingcustomer")
	ResponseEntity<?> getAllPendingCustomer() {
		System.out.println("get all pending customer");
		List<CustomerInfoDTO> pendingCustomers = customerservice.getPendingCustomers();

		if (pendingCustomers.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}

		return ResponseEntity.ok(pendingCustomers); // 200 - OK with list
	}

	@GetMapping("/alltransactions")
	ResponseEntity<?> getAllTransaction() {
		System.out.println("get all transaction");
		return ResponseEntity.ok(adminService.getAllTransactions());
	}

	@PutMapping("/verifycustomer/{id}")
	ResponseEntity<?> getAllTransaction(@PathVariable Long id) {
		System.out.println("get verify");
		try {
			ApiResponse response = customerservice.verifyCustomer(id);
			return ResponseEntity.ok(response); // 200 OK for successful verification

		} catch (ResourceNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(ex.getMessage())); // 404 if
																										// customer not
																										// found
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse("Error verifying customer")); // 500 for unexpected errors
		}
	}

	@DeleteMapping("/delete/{id}")
	ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
		System.out.println("get delete");
		try {
	        ApiResponse response = employeeService.deleteEmployee(id);
	        return ResponseEntity.ok(response); // 200 OK on success
	    } catch (ResourceNotFoundException ex) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body(new ApiResponse(ex.getMessage())); // 404 Not Found
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(new ApiResponse("Error deleting employee")); // 500 Internal Server Error
	    }
	}

}
