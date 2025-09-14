package com.sunbeam.service;

import java.util.List;

import javax.naming.AuthenticationException;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.CustomerInfoDTO;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.UserAuth;

public interface CustomerService {
	
	List<Customer> getFindByStatusVerified();

	CustomerDashboardResponseDTO getCustomerDashboard(Long customerId);

	Long getCustomerIdFromUserDetails(UserAuth userAuth) throws AuthenticationException;

	ApiResponse getCustomerCard(Long customerId);

	List<CustomerInfoDTO> getPendingCustomers();

	ApiResponse verifyCustomer(Long id);

	ApiResponse deleteCustomerAndAccount(Long id);
	
	ApiResponse activateCustomerAndAccount(Long id);

//	ApiResponse deleteEmployee(Long id);

}
