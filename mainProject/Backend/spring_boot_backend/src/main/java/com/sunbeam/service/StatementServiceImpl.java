package com.sunbeam.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sunbeam.dao.AccountDao;
import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dto.StatementRequestDTO;
import com.sunbeam.dto.StatementResponseDTO;
import com.sunbeam.dto.TransactionSummaryResponseDto;
import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.Transaction;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class StatementServiceImpl implements StatementService {

	private TransactionDao transactionDao;

	private AccountDao accountDao;

	public StatementResponseDTO getStatement(StatementRequestDTO requestDTO) {

		
		
		
		
		//		AccountEntity account = accountRepo.findByAccountNumber(accountNo)
//				.orElseThrow(() -> new RuntimeException("Account not found"));
//
//		LocalDateTime fromDateTime = fromDate != null ? fromDate.atStartOfDay() : null;
//		LocalDateTime toDateTime = toDate != null ? toDate.atTime(LocalTime.MAX) : null;
		
		
//		List<Transaction> txns = transactionDao.findFilteredTransactions(requestDTO.getAccountNo(),requestDTO.getDateTimeFrom(),requestDTO.getDateTimeTo());

		List<TransactionSummaryResponseDto> txnDTOs = new ArrayList<>();

//		for (Transaction t : txns) {
//		    TransactionSummaryResponseDto dto = new TransactionSummaryResponseDto();
//		    dto.setDate(t.getCreatedAt());
//		    dto.setType(t.getTransactionType().toString());
//		    dto.setAmount(String.format("%.2f", t.getAmount()));
//		    dto.setDescription(t.getDescription());
//
//		    txnDTOs.add(dto);
//		}


		StatementResponseDTO response = new StatementResponseDTO();
		response.setTransactions(txnDTOs);

		return response;
	}
}
