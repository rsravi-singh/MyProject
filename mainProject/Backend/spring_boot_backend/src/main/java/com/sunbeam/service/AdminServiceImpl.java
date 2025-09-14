package com.sunbeam.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.AdminDao;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dao.EmployeeDao;
import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.AccountDTO;
import com.sunbeam.dto.AddressDTO;
import com.sunbeam.dto.AdminCustomerResponseDTO;
import com.sunbeam.dto.AdminEmployeeResponseDTO;
import com.sunbeam.dto.AdminRequestDTO;
import com.sunbeam.dto.AdminTransactionResponseDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardDetailResponseDTO;
import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.AddressEntity;
import com.sunbeam.entity.Admin;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.Role;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.Transaction;
import com.sunbeam.entity.UserAuth;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminDao admindao;
	private final UserDao userdao;
	private final CustomerDao customerdao;
	private final EmployeeDao employeedao;
	private final TransactionDao transactiondao;
	private final PasswordEncoder passwordEncoder;

	@Override
	public ApiResponse addAdmin(AdminRequestDTO dto) {

		// Check if email already exists
		if (admindao.existsByEmail(dto.getEmail())) {
			return new ApiResponse("Admin with this email already exists.");
		}

		// Create UserAuth entry
		UserAuth user = new UserAuth();
		user.setEmail(dto.getEmail());
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		user.setRole(Role.ADMIN);
		user.setStatus(Status.ACTIVE);
		user = userdao.save(user);

		// Create Admin entity
		Admin admin = new Admin();
		admin.setId(user.getId()); // Same ID as auth for direct mapping
		admin.setEmail(dto.getEmail());
		admin.setPassword(passwordEncoder.encode(dto.getPassword())); // Don't store raw password in admin table
		admin.setPhoneNumber(dto.getPhoneNumber());
		admin.setAuth(user);

		admindao.save(admin);

		return new ApiResponse("Admin added successfully.");
	}

	public List<AdminTransactionResponseDTO> getAllTransactions() {
		List<Transaction> transactions = transactiondao.findAll();

		return transactions.stream().map(tx -> {
			AdminTransactionResponseDTO dto = new AdminTransactionResponseDTO();
			dto.setSenderAccount(tx.getAccount().getAccountNumber());
			dto.setReceiverAccount(tx.getReceiverAccount().getAccountNumber());
			dto.setSenderName(
					tx.getAccount().getCustomer().getFirstName() + " " + tx.getAccount().getCustomer().getLastName());
			dto.setSenderEmail(tx.getAccount().getCustomer().getAuth().getEmail());
			dto.setAmount(tx.getAmount());
			dto.setTransactionMode(tx.getTransactionMode());
			dto.setTransactionType(tx.getTransactionType());
			dto.setDescription(tx.getDescription());
			dto.setCreatedAt(tx.getCreatedAt());
			dto.setStatus(tx.getStatus());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public List<AdminCustomerResponseDTO> listCustomersOrderbydate() {
		List<Customer> customers = customerdao.findAll();

		return customers.stream().map(c -> {
			AdminCustomerResponseDTO dto = new AdminCustomerResponseDTO();

			dto.setId(c.getId());
			dto.setFirstName(c.getFirstName());
			dto.setLastName(c.getLastName());
			dto.setDob(c.getDob());
			dto.setGender(c.getGender());
			dto.setNationality(c.getNationality());
			dto.setPhotoId(c.getPhotoId());
			dto.setPhoneNumber(String.valueOf(c.getPhoneNumber()));
			dto.setStatus(c.getAuth().getStatus());
			dto.setPhoto(c.getPhoto());
			// Address
			if (c.getAddress() != null) {
				AddressEntity addr = c.getAddress();
				dto.setAddress(new AddressDTO(addr.getAdrLine1(), addr.getAdrLine2(), addr.getCity(), addr.getState(), addr.getCountry(), addr.getPinCode()));
			}

			// Account
			if (c.getAccount() != null) {
				AccountEntity a = c.getAccount();
				dto.setAccount(new AccountDTO(a.getId() ,a.getAccountNumber(), a.getBalance(), a.getStatus()));
			}

			// Card Details
			if (c.getAccount() != null && c.getAccount().getCardDetails() != null) {
				dto.setCarddetail(new CardDetailResponseDTO(c.getAccount().getCardDetails().getCardNumber(), c.getAccount().getCardDetails().getExpiry(), c.getAccount().getCardDetails().getCvv(), c.getAccount().getCardDetails().getType()));
			}

			// Email (from UserAuth)
			if (c.getAuth() != null) {
				dto.setEmail(c.getAuth().getEmail());
			}

			return dto;
		}).toList();
	}
	
	@Override
    public List<AdminEmployeeResponseDTO> getAllEmployees() {
        List<EmployeeEntity> employees = employeedao.findAllByOrderByCreatedAtDesc();

        return employees.stream()
                .map(emp -> new AdminEmployeeResponseDTO(
                        emp.getId(),
                        emp.getEmail(),
                        emp.getFirstName(),
                        emp.getLastName(),
                        emp.getPhoneNumber(),
                        emp.getDob(),
                        emp.getGender(),
                        emp.getGovtIdType(),
                        emp.getGovtId(),
                        emp.getStatus(),
                        emp.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

}
