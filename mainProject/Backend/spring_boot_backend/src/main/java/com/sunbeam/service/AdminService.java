package com.sunbeam.service;

import java.util.List;

import javax.naming.AuthenticationException;

import com.sunbeam.dto.AdminCustomerResponseDTO;
import com.sunbeam.dto.AdminEmployeeResponseDTO;
import com.sunbeam.dto.AdminRequestDTO;
import com.sunbeam.dto.AdminTransactionResponseDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.UserAuth;

public interface AdminService {
	
	ApiResponse addAdmin(AdminRequestDTO dto);

	List<AdminTransactionResponseDTO> getAllTransactions();

	List<AdminCustomerResponseDTO> listCustomersOrderbydate();
	List<AdminEmployeeResponseDTO> getAllEmployees();
}
