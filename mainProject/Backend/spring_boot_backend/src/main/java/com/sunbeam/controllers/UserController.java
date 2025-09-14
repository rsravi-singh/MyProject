package com.sunbeam.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunbeam.dto.AuthResp;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.OtpRequest;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.entity.UserAuth;
import com.sunbeam.security.CustomUserDetailsServiceImpl;
import com.sunbeam.security.JwtUtils;
import com.sunbeam.service.EmailService;
import com.sunbeam.service.OtpService;
import com.sunbeam.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	private final UserService userService;
	private final ObjectMapper objectMapper;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final OtpService otpService;
	private final EmailService emailService;
	private final CustomUserDetailsServiceImpl customUserDetailsService;

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginDTO dto, HttpSession session) {
		try {
			Authentication authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
			System.out.println(authToken);
			Authentication validAuth = authenticationManager.authenticate(authToken);

			// Get authenticated principal (UserDetails)
			UserDetails userDetails = (UserDetails) validAuth.getPrincipal();
			if (!userDetails.isEnabled()) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body(Map.of("error", "Account not active. Please wait to enable."));
			}
			// Get Role from authorities (assuming only one role per user)
			SecurityContextHolder.getContext().setAuthentication(validAuth);
			String role = userDetails.getAuthorities().iterator().next().getAuthority(); // e.g., "ROLE_CUSTOMER"
//			String otp = otpService.generateOtp(dto.getEmail());
//			System.out.println("Generated OTP: " + otp);
//			emailService.sendOtpEmail(dto.getEmail(), otp);
			 String jwtToken = jwtUtils.generateJwtToken(validAuth);

			session.setAttribute("email", dto.getEmail());
			session.setAttribute("role", role);

			return ResponseEntity.ok(Map.of(
	                "message", "Login successful",
	                "token", jwtToken,
	                "role", role
	        ));
		} catch (DisabledException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
					.body(Map.of("error", "Account disabled. Please wait to verify."));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "An unexpected error occurred."));
		}

	}

	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@RequestParam("image") MultipartFile img,
			@RequestParam("filedata") String filedata) throws Exception {
		try {
			RegisterDTO dto1 = objectMapper.readValue(filedata, RegisterDTO.class);
			boolean isCreated = userService.signUp(dto1, img) != null;
			if (isCreated) {
				return ResponseEntity.status(HttpStatus.CREATED)
						.body(Map.of("message", "User registered successfully"));
			} else {
				return ResponseEntity.status(HttpStatus.CONFLICT)
						.body(Map.of("error", "User with this email already exists"));
			}
		} catch (JsonProcessingException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid request data format"));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "An unexpected error occurred"));
		}
	}

	@GetMapping("/profile")
	public ResponseEntity<?> getCustomerProfile(@AuthenticationPrincipal UserAuth userDetails) {
		return ResponseEntity.ok(userService.getProfileByUserId(userDetails.getId()));
	}
	@GetMapping("/employeeprofile")
	public ResponseEntity<?> getEmployeeProfile(@AuthenticationPrincipal UserAuth userDetails) {
		return ResponseEntity.ok(userService.getEmployeeProfileByUserId(userDetails.getId()));
	}

//	@PostMapping("/verifyOtp")
//	public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest dto, HttpSession session) {
//
//		String sessionEmail = (String) session.getAttribute("email");
//
//		if (sessionEmail == null || !sessionEmail.equals(dto.getEmail())) {
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//					.body(Map.of("message", "Session expired or email mismatch"));
//		}
//
//		boolean isValidOtp = otpService.validateOtp(sessionEmail, dto.getOtp());
//		if (!isValidOtp) {
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid or expired OTP"));
//		}
//
//		// Load user details and set Spring Security context
//		UserDetails userDetails = customUserDetailsService.loadUserByUsername(sessionEmail);
//		Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//		SecurityContextHolder.getContext().setAuthentication(auth);
//
//		// Get role from authorities
//		String role = userDetails.getAuthorities().iterator().next().getAuthority(); // e.g., "ROLE_CUSTOMER"
//
//		// Generate JWT token
//		String jwtToken = jwtUtils.generateJwtToken(auth);
//
//		// Send response
//		return ResponseEntity.ok().body(Map.of("message", "Successful login!", "token", jwtToken, "role", role));
//	}
}
