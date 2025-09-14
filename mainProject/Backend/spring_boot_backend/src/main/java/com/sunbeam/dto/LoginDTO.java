package com.sunbeam.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginDTO {
	
	@NotBlank(message = "Email is required")
	private String email;
	@NotBlank(message = "Password is required")
	private String password;

}
