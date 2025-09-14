package com.sunbeam.dto;

import com.sunbeam.entity.AccountEntity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponseDTO {
	
	@NotNull(message = "firstname is required")
    private String firstName;
	
	@NotNull(message = "lastname is required")
    private String lastName;
	
	@NotNull (message = "gender is required")
    private String gender;
	
	@NotNull(message = "email is required")
	@Email(message = "email is valid")
    private String email;
	
	@NotNull(message = "account info is valid")
    private AccountEntity account;
	
	@NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Invalid phone number format")
    private String phoneNumber;
}
