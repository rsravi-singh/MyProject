package com.sunbeam.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sunbeam.dao.AdminDao;
import com.sunbeam.dto.AdminCustomerResponseDTO;
import com.sunbeam.dto.AdminEmployeeResponseDTO;
import com.sunbeam.dto.AdminRequestDTO;
import com.sunbeam.dto.AdminTransactionResponseDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.pojo.BankRates;
import com.sunbeam.service.AdminService;
import com.sunbeam.service.BankRateService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private final AdminDao adminDao;

	private final BankRateService bankRateService;
	private final AdminService adminService;
	private final AdminDao admindao; 


//	@GetMapping("/rates")
//	public ResponseEntity<BankRates> getRates() throws IOException {
//		return ResponseEntity.ok(bankRateService.getRates());
//	}
//
//	@PutMapping("/rates")
//	public ResponseEntity<String> updateRates(@RequestBody BankRates updatedRates) throws IOException {
//		bankRateService.updateRates(updatedRates);
//		return ResponseEntity.ok("Rates updated successfully");
//	}
	
	@PostMapping("/add")
    public ResponseEntity<?> addAdmin(@RequestBody AdminRequestDTO dto) {
		if (adminDao.existsByEmail(dto.getEmail())) {
	        return ResponseEntity.status(HttpStatus.CONFLICT)
	                .body(new ApiResponse("Admin with this email already exists."));
	    }
        ApiResponse response = adminService.addAdmin(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
	
	@GetMapping("/alltransactions")
    public ResponseEntity<?> getAllTransactions() {
		List<AdminTransactionResponseDTO> transactions = adminService.getAllTransactions();
		if (transactions.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	    }
        return ResponseEntity.ok(transactions);
    }
	
	@GetMapping("/allcustomer")
	public ResponseEntity<?> listCustomers() {
		List<AdminCustomerResponseDTO> customers = adminService.listCustomersOrderbydate();

	    if (customers.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	    }

	    return ResponseEntity.ok(customers);
	}
	
	@GetMapping("/allemployee")
    public ResponseEntity<?> getAllEmployees() {
		List<AdminEmployeeResponseDTO> employees = adminService.getAllEmployees();

	    if (employees.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	    }

	    return ResponseEntity.ok(employees);
    }
	
}
