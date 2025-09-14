package com.sunbeam.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.custom_exceptions.IOException;
import com.sunbeam.dto.AdminResponseDTO;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.ProfileResponseDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.dto.UserResponseDTO;

public interface UserService {

	UserDTO signIn(LoginDTO dto);
	

	ApiResponse signUp(RegisterDTO dto, MultipartFile img) throws Exception;

	ProfileResponseDTO getProfileByUserId(Long userId);

	EmployeeResponseDTO getEmployeeProfileByUserId(Long userId);

//	AdminResponseDTO getAdminProfileByUserId(Long userId);



}
