package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.DuplicateResourceException;
import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.dao.EmployeeDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CustomerInfoDTO;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.Role;
import com.sunbeam.entity.Status;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.Transaction;
import com.sunbeam.entity.UserAuth;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeDao employeeDao;
	private final UserDao userDao;
	private final CustomerService customerservice;
	private final PasswordEncoder encoder;
	private final ModelMapper modelMapper;

	@Override
	public ApiResponse createEmployee(EmployeeResponseDTO dto) {
		if (employeeDao.existsByEmail(dto.getEmail())) {
			throw new DuplicateResourceException("Email already exists");
		}
		UserAuth user = new UserAuth();
		user.setEmail(dto.getEmail());
		user.setPassword(encoder.encode(dto.getPassword()));
		user.setRole(Role.EMPLOYEE); // Assuming you have CUSTOMER role
		user.setStatus(Status.ACTIVE); // Or ACTIVE if auto-verification
		userDao.save(user);
		EmployeeEntity entity = modelMapper.map(dto, EmployeeEntity.class);
		entity.setPassword(encoder.encode(dto.getPassword()));
		entity.setStatus(Status.ACTIVE);
		entity.setAuth(user);
		employeeDao.save(entity);
		return new ApiResponse("New Employee hired");
	}

	@Override
	public List<CustomerInfoDTO> getPendingCustomer() {
		return customerservice.getPendingCustomers();
	}

	@Override
	public ApiResponse deleteEmployee(Long id) {
		EmployeeEntity emp = employeeDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

		employeeDao.delete(emp);
		return new ApiResponse("Employee deleted successfully");
	}
}
