package com.sunbeam.controllers;

import java.util.List;

import javax.naming.AuthenticationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.custom_exceptions.InsufficientBalanceException;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.UserAuth;
import com.sunbeam.service.CustomerService;
import com.sunbeam.service.TransactionService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/transaction")
@AllArgsConstructor
public class TransactionController {

	
	private final TransactionService transactionService;
	private CustomerService customerInfoService;
	private CustomerDao customerdao;

	

    @PostMapping("/pay")
    public ResponseEntity<?> processPayment(@RequestBody TransactionDTO dto, @AuthenticationPrincipal UserAuth userDetails) throws AuthenticationException {
    	if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("User not authenticated"));
        }

    	String username = userDetails.getUsername();
        
        // Find customer by auth email
    	Customer customer = customerdao.findByAuth_Email(username)
                .orElseThrow(() -> new AuthenticationException("Customer not found"));
    	System.out.println(customer.toString());
    	try {
            ApiResponse api =  transactionService.saveTransaction(dto, customer.getId());
            return ResponseEntity.ok(api);
        } catch (InsufficientBalanceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error processing payment"));
        }
    }
    
    
    @GetMapping("/alltransactions")
    public ResponseEntity<?> getTransactionsByUserId(@AuthenticationPrincipal UserAuth userAuth) {
    	if (userAuth == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("User not authenticated"));
        }

        Long customerId;
        try {
            customerId = customerInfoService.getCustomerIdFromUserDetails(userAuth);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Authentication failed"));
        }

        List<TransactionDTO> transactions = transactionService.findByCustomerId(customerId);
        return ResponseEntity.ok(transactions);
    }
//
//    @GetMapping("/dashboard")
//    public ResponseEntity<?> getUserDetailAndStatementByUserId(@AuthenticationPrincipal UserAuth userDetails) {
//    	System.out.println("in Mehtod");
//        CustomerDashboardResponseDTO transactions = transactionService.findUserDetailAndStatementByUserId(userDetails.getId());
//        return ResponseEntity.ok(transactions);
//    }
    
//    @PutMapping("/cardupdate")
//    public ResponseEntity<?> updateCardExpirayByUserId(@AuthenticationPrincipal UserEntity userDetails, @RequestBody CardRequestDTO dto) {
//        return ResponseEntity.ok(transactionService.updateCardExpirayByUserId(userDetails.getId(), dto));
//    }
	    
	
}
