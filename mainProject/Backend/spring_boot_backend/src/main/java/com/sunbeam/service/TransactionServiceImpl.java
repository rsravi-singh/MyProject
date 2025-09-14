package com.sunbeam.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.BadRequestException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.AccountDao;
import com.sunbeam.dao.CardDetailDAO;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardDetailResponseDTO;
import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.CardDetails;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.Transaction;
import com.sunbeam.entity.TransactionType;
import com.sunbeam.entity.UserAuth;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {

	private final ModelMapper modelMapper;
	private final TransactionDao transactionDao;
	private final CustomerDao customerdao;
	private final AccountDao accountDao;
	private final UserDao userDao;
	private final CardDetailDAO cardDetailDao;
	private final EmailService emailService;

	@Override
	public ApiResponse saveTransaction(TransactionDTO dto, Long customerId) {

		// 1. Validate sender account
		System.out.println(dto.toString());
		AccountEntity senderAccount = accountDao.findByCustomerId(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Sender account not found"));
		System.out.println(senderAccount.toString());
		// 2. Validate receiver account
		AccountEntity receiverAccount = accountDao.findByAccountNumber(dto.getReceiverAccount())
				.orElseThrow(() -> new ResourceNotFoundException("Receiver account not found"));
		
		System.out.println(receiverAccount.toString());
		// 3. Check if sender has enough balance
		if (senderAccount.getBalance() < dto.getAmount()) {
			throw new BadRequestException("Insufficient balance in sender's account");
		}

		// 4. Deduct amount from sender
		senderAccount.setBalance(senderAccount.getBalance() - dto.getAmount());
		// 5. Add amount to receiver
		receiverAccount.setBalance(receiverAccount.getBalance() + dto.getAmount());

		// 6. Save updated accounts
		accountDao.save(senderAccount);
		accountDao.save(receiverAccount);

		// 7. Create Debit Transaction for Sender
		Transaction debitTransaction = new Transaction();
		debitTransaction.setAccount(senderAccount);
		debitTransaction.setReceiverAccount(receiverAccount);
		debitTransaction.setAmount(dto.getAmount());
		debitTransaction.setAccountHolderName(
				senderAccount.getCustomer().getFirstName() + " " + senderAccount.getCustomer().getLastName());
		debitTransaction.setTransactionMode(dto.getTransactionMode());
		debitTransaction.setTransactionType(TransactionType.DEBIT);
		debitTransaction.setStatus(Status.ACTIVE);
		debitTransaction.setDescription("Transfer to account: " + receiverAccount.getAccountNumber()+" "+ receiverAccount.getCustomer().getFirstName());

		transactionDao.save(debitTransaction);
		
		 // 8. Create Credit Transaction for Receiver
	    Transaction creditTransaction = new Transaction();
	    creditTransaction.setAccount(receiverAccount);
	    creditTransaction.setReceiverAccount(senderAccount);
	    creditTransaction.setAmount(dto.getAmount());
	    creditTransaction.setAccountHolderName(receiverAccount.getCustomer().getFirstName() + " " + receiverAccount.getCustomer().getLastName());
	    creditTransaction.setTransactionMode(dto.getTransactionMode());
	    creditTransaction.setTransactionType(TransactionType.CREDIT);
	    creditTransaction.setStatus(Status.ACTIVE);
	    creditTransaction.setDescription("Transfer from account: " + senderAccount.getCustomer().getFirstName()+" "+senderAccount.getCustomer().getLastName());

	    transactionDao.save(creditTransaction);
	    emailService.sendTransactionEmail(receiverAccount.getCustomer().getAuth().getEmail(), creditTransaction);
	    return new ApiResponse("Payment of ₹" + dto.getAmount() + " transferred successfully to account Number " + receiverAccount.getAccountNumber());
	}


	@Override
	public List<TransactionDTO> findByCustomerId(Long customerId) {
		Customer customer = customerdao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));
		List<Transaction> transactions = transactionDao.findByAccount_Id(customer.getAccount().getId());
		if (transactions.isEmpty()) {
			System.out.println("Error fetching transactions");
			return Collections.emptyList(); // Return empty list instead of failing
		}
		List<TransactionDTO> list = transactions.stream().map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
				.collect(Collectors.toList());
		
		return list;
	}
//
//
//	@Override
//	public CustomerDashboardResponseDTO findUserDetailAndStatementByUserId(Long userId) {
//		System.out.println("in service method");
//		User user = userDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
//		CardDetails card = cardDetailDao.findByUserId(userId);
//		
//		List<TransactionDTO> trnasdto = transactionDao.findTop5ByUserIdOrderByCreatedAtDesc(userId).stream()
//				.map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
//				.collect(Collectors.toList());
//		CustomerDashboardResponseDTO dto = new CustomerDashboardResponseDTO();
//		dto.setFullName(user.getFirstName()+" "+ user.getLastName());
//		dto.setEmail(user.getEmail());
//		dto.setMobile(user.getPhoneNumber());
//		dto.setAccountNo(user.getAccount().getAccountNumber());
//		if(card != null) {
//			CardDetailResponseDTO carddto = modelMapper.map(card, CardDetailResponseDTO.class);
//			dto.setCard(carddto);
//		}else {
//			dto.setCard(null);
//		}
//		dto.setTransaction(trnasdto);
//		
//		return dto;
//	}
//
//
//	public ApiResponse updateCardExpirayByUserId(Long userId, CardRequestDTO dto) {
//		CardDetails card = cardDetailDao.findByUserId(userId);
//		System.out.println(dto.getExpiry());
//		if(card != null) {
//			card.setExpiry(dto.getExpiry());
//			return new ApiResponse("card expiray detail updated successfully");
//		}else {
//			return new ApiResponse("card not found");
//		}
//		
//	}

}
