package com.sunbeam.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.custom_exceptions.AuthenticationFailureException;
import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.AccountDao;
import com.sunbeam.dao.AdminDao;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dao.EmployeeDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.AdminResponseDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.ProfileResponseDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.dto.UserResponseDTO;
import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.AddressEntity;
import com.sunbeam.entity.Admin;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.Role;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.UserAuth;

import lombok.AllArgsConstructor;

@Transactional
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserDao userDao;
	private final CustomerDao customerDao;
	private final AccountDao accountDao;
	private final PasswordEncoder encoder;
	private final EmployeeDao employeeDao;
	private final AdminDao adminDao;
	private final ModelMapper modelMapper;

	@Override
	public UserDTO signIn(LoginDTO dto) {
		UserAuth entity = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(() -> new AuthenticationFailureException("Invalid email or password"));
		UserDTO userDto = modelMapper.map(entity, UserDTO.class);
		userDto.setRole(entity.getRole().name()); // assuming enum Role
		return userDto;
	}


	@Override
	public ApiResponse signUp(RegisterDTO dto, MultipartFile img) throws Exception {
		// Create a new User manually

		UserAuth user = new UserAuth();
		user.setEmail(dto.getEmail());
		user.setPassword(encoder.encode(dto.getPassword()));
		user.setRole(Role.CUSTOMER); // Assuming you have CUSTOMER role
		user.setStatus(Status.PENDING); // Or ACTIVE if auto-verification
		userDao.save(user);

		Customer customer = new Customer();
		customer.setId(user.getId()); // Mapping 1:1 with UserAuth
		customer.setFirstName(dto.getFirstName());
		customer.setLastName(dto.getLastName());
		customer.setDob(LocalDate.parse(dto.getDateOfBirth()));
		customer.setGender(dto.getGender());
		customer.setNationality(dto.getNationality());
		customer.setPhotoId(dto.getPhotoId());
		customer.setPhoneNumber(Long.parseLong(dto.getPhoneNumber()));
		if (img != null && !img.isEmpty()) {
			try {
				customer.setPhoto(img.getBytes());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			throw new IllegalArgumentException("Profile image is required");
		}

		customer.setAddress(dto.getAddress());
		customer.setAuth(user); // Link back to UserAuth
		
		
		// 4. Create AccountEntity
	    AccountEntity account = new AccountEntity();
	    account.setCustomer(customer);
	    account.setAccountNumber(dto.getPhoneNumber()); // as per your note
	    account.setBalance(5000);
	    accountDao.save(account);

	    // 5. Set account in customer (bidirectional)
	    customer.setAccount(account);
		customerDao.save(customer);

		System.out.println("Date : " + dto.getDateOfBirth());
		System.out.println("Date : " + customer.toString());

		return new ApiResponse("Customer registered successfully.");
	}

	@Override
    public ProfileResponseDTO getProfileByUserId(Long userId) {
        UserAuth user1 = userDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        Customer user = customerDao.findByAuth_Id(userId);
        ProfileResponseDTO dto = modelMapper.map(user, ProfileResponseDTO.class);
        dto.setFullName(user.getFirstName()+" "+user.getLastName());
        dto.setAdrLine1(user.getAddress().getAdrLine1());
        dto.setAdrLine2(user.getAddress().getAdrLine2());
        dto.setCity(user.getAddress().getCity());
        dto.setCountry(user.getAddress().getCountry());
        dto.setState(user.getAddress().getState());
        dto.setPincode(user.getAddress().getPinCode());
        dto.setPhoto(user.getPhoto());
        dto.setEmail(user1.getEmail());
        dto.setDateOfBirth(user.getDob());
        dto.setStatus(user1.getStatus());
        System.out.println(dto.toString());
        return dto;
    }

	@Override
	public EmployeeResponseDTO getEmployeeProfileByUserId(Long userId) {
		EmployeeEntity cust = employeeDao.findByAuth_Id(userId).orElseThrow(()-> new ResourceNotFoundException("Employee not found"));
		System.out.println(cust.toString());
        EmployeeResponseDTO dto = modelMapper.map(cust, EmployeeResponseDTO.class);  
        System.out.println(dto.toString());
        return dto;
	}

//	@Override
//	public AdminResponseDTO getAdminProfileByUserId(Long userId) {
//		Admin user = adminDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("Admin not found"));
//        AdminResponseDTO dto = modelMapper.map(user, AdminResponseDTO.class);
//        return dto;
//	}

}
