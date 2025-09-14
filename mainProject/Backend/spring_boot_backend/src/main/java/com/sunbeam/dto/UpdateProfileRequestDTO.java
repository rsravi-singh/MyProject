package com.sunbeam.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateProfileRequestDTO {

	@NotBlank(message = "Address Line 1 is required")
	private String adrLine1;

	@NotBlank(message = "Address Line 2 is required")
	private String adrLine2;

	@NotBlank(message = "City is required")
	private String city;

	@NotBlank(message = "State is required")
	private String state;

	@NotBlank(message = "Country is required")
	private String country;

	@NotBlank(message = "Pin Code is required")
	private long pincode;

	@NotBlank(message = "Mobile number is required")
	private String mobileNo;
}
