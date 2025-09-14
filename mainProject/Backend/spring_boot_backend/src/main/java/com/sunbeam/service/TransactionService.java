package com.sunbeam.service;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.UserAuth;

public interface TransactionService {

	List<TransactionDTO> findByCustomerId(Long userId);

	ApiResponse saveTransaction(TransactionDTO dto, Long customerId);
//
//
//	CustomerDashboardResponseDTO findUserDetailAndStatementByUserId(Long userId);
//
//	ApiResponse updateCardExpirayByUserId(Long userId, CardRequestDTO dto);

}
