package com.sunbeam.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.AccountDao;
import com.sunbeam.dao.CardDao;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardDetailResponseDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.CustomerInfoDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.CardDetails;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.Transaction;
import com.sunbeam.entity.UserAuth;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	private CustomerDao customerdao;
	private TransactionDao transactiondao;
	private AccountDao accountdao;
	private CardDao carddao;

	@Override
	public List<Customer> getFindByStatusVerified() {
		return customerdao.findByAuth_Status(Status.VERIFIED);
	}

	@Override
	public ApiResponse verifyCustomer(Long id) {
		Customer cust = customerdao.findById(id).orElseThrow(() -> new ResourceNotFoundException("customer not found"));
		cust.getAuth().setStatus(Status.ACTIVE);
		cust.getAccount().setStatus(Status.ACTIVE);
		customerdao.save(cust);
		return new ApiResponse("Customer verified");
	}

	@Transactional
	public ApiResponse deleteCustomerAndAccount(Long customerId) {
		Customer cust = customerdao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

		// Soft delete the customer
		cust.setDeleted(true);

		// Set UserAuth status to PENDING if linked
		if (cust.getAuth() != null) {
			cust.getAuth().setStatus(Status.DEACTIVATED);
		}

		// Optional: If you also want to mark account inactive instead of deleting
		if (cust.getAccount() != null) {
			cust.getAccount().setStatus(Status.DEACTIVATED); // You'll need to add 'active' field in AccountEntity
		}

		// Save the changes (because of CascadeType.ALL, UserAuth changes will also
		// persist)
		customerdao.save(cust);

		return new ApiResponse("Customer marked as deleted and account set to pending status");
	}
	
	@Transactional
	public ApiResponse activateCustomerAndAccount(Long customerId) {
	    Customer cust = customerdao.findById(customerId)
	            .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

	    // Reactivate the customer
	    cust.setDeleted(false);

	    // Set UserAuth status to ACTIVE if linked
	    if (cust.getAuth() != null) {
	        cust.getAuth().setStatus(Status.ACTIVE);
	    }

	    // Reactivate the account if present
	    if (cust.getAccount() != null) {
	        cust.getAccount().setStatus(Status.ACTIVE);
	    }

	    // Save changes
	    customerdao.save(cust);

	    return new ApiResponse("Customer and account reactivated successfully");
	}


	@Override
	public List<CustomerInfoDTO> getPendingCustomers() {
		List<Customer> customers = customerdao.findPendingCustomers();

		return customers.stream().map(this::convertToBasicDTO).collect(Collectors.toList());
	}

	private CustomerInfoDTO convertToBasicDTO(Customer customer) {
		CustomerInfoDTO dto = new CustomerInfoDTO();
		dto.setId(customer.getId());
		dto.setFirstName(customer.getFirstName());
		dto.setLastName(customer.getLastName());
		dto.setDob(customer.getDob());
		dto.setGender(customer.getGender());
		dto.setNationality(customer.getNationality());
		dto.setPhotoId(customer.getPhotoId());
		dto.setPhoneNumber(customer.getPhoneNumber());
		dto.setDeleted(customer.isDeleted());
		dto.setPhoto(customer.getPhoto());

		return dto;
	}

	@Override
	public CustomerDashboardResponseDTO getCustomerDashboard(Long customerId) {
		// TODO Auto-generated method stub
		// Fetch customer with necessary relations
		Customer customer = customerdao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));

		// Validate customer has an account
		if (customer.getAccount() == null) {
			throw new IllegalStateException("Customer has no associated account");
		}
		// Build the response DTO
		return CustomerDashboardResponseDTO.builder().fullName(customer.getFirstName() + " " + customer.getLastName())
				.email(customer.getAuth().getEmail()).mobile(customer.getPhoneNumber())
				.accountNo(customer.getAccount().getAccountNumber()).balance(customer.getAccount().getBalance())
				.card(mapCardDetails(customer.getAccount().getCardDetails()))
				.transaction(getRecentTransactions(customer.getAccount().getId())).build();
	}

	private CardDetailResponseDTO mapCardDetails(CardDetails card) {
		if (card == null) {
			return null;
		}

		return CardDetailResponseDTO.builder().cardNumber(card.getCardNumber()).expiry(card.getExpiry())
				.cvv(card.getCvv()).type(card.getType()).build();
	}

	private List<TransactionDTO> getRecentTransactions(Long accountId) {
		// Get all transactions sorted by date (descending) and limit to 5
		try {
			return transactiondao.findTop5ByAccountIdOrderByCreatedAtDesc(accountId).stream()
					.map(this::mapTransactionToDTO).collect(Collectors.toList());
		} catch (Exception e) {
			System.out.println("Error fetching transactions" + e);
			return Collections.emptyList(); // Return empty list instead of failing
		}
	}

	private TransactionDTO mapTransactionToDTO(Transaction transaction) {
		return TransactionDTO.builder().receiverAccount(transaction.getReceiverAccount().getAccountNumber())
				.amount(transaction.getAmount()).transactionType(transaction.getTransactionType())
				.transactionMode(transaction.getTransactionMode()).description(transaction.getDescription())
				.createdAt(transaction.getCreatedAt()).status(transaction.getStatus()).build();
	}

	@Override
	public Long getCustomerIdFromUserDetails(UserAuth userAuth) throws AuthenticationException {
		System.out.println(userAuth.getEmail() + userAuth.getUsername());
		return customerdao.findByAuth_Email(userAuth.getUsername())
				.orElseThrow(() -> new AuthenticationException("Customer not found")).getId();
	}

	@Override
	@Transactional
	public ApiResponse getCustomerCard(Long customerId) {
		// TODO Auto-generated method stub
		System.out.println(customerId);
		Customer customer = customerdao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
		System.out.println(customer.toString());
		AccountEntity account = customer.getAccount(); // Use new method
		if (account.getCardDetails() != null) {
			throw new ResourceNotFoundException("Customer already has a card");
		}
		System.out.println(account.toString());
		CardDetails newCard = generateCardDetails(customer, account);
		newCard.setAccount(account); // 👈 Important
		account.setCardDetails(newCard); // 👈 Optional for bidirectional consistency
//        accountdao.save(account);
		System.out.println(newCard.toString());
		// Save card (owning side)
		try {
			carddao.save(newCard);
			System.out.println("Saved card ID: " + newCard.getId());
		} catch (Exception e) {
			System.err.println("Error saving card: " + e.getMessage());
			e.printStackTrace(); // 👈 this shows full stack trace
		} // ✅ Save the owning entity
		System.out.println("Saved card ID: " + newCard.getId()); // Should not be null

		return new ApiResponse("Card Apply Successfully");
	}

	private CardDetails generateCardDetails(Customer customer, AccountEntity account) {
		String cardNumber = generateRandomCardNumber();
		System.out.println(cardNumber);
		String cardHolderName = customer.getFirstName() + " " + customer.getLastName();
		System.out.println(cardHolderName);
		return CardDetails.builder().cardNumber(cardNumber).holderName(cardHolderName)
				.expiry(LocalDate.now().plusYears(4)) // 4 years from now
				.cvv(generateRandomCVV()).type("VISA") // or "MASTERCARD" based on your logic
				.account(account).build();
	}

	private String generateRandomCardNumber() {
		Random random = new Random();
		return String.format("%04d %04d %04d %04d", random.nextInt(10000), random.nextInt(10000), random.nextInt(10000),
				random.nextInt(10000));
	}

	private Integer generateRandomCVV() {
		return 100 + new Random().nextInt(900); // 3-digit number
	}
}
