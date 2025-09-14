package com.sunbeam.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDashboardResponseDTO {

	@NotBlank(message = "Full name is required")
	private String fullName;

	@Email(message = "Email should be valid")
	@NotBlank(message = "Email is required")
	private String email;

	@NotNull(message = "Mobile number is required")
	@Positive(message = "Mobile number should be positive")
	private Long mobile;

	@NotBlank(message = "Account number is required")
	private String accountNo;
	
	@NotBlank(message = "balance is required")
	private double balance;

	@Valid
	private CardDetailResponseDTO card;

	@NotEmpty(message = "Transaction history cannot be empty")
	@Valid
	private List<TransactionDTO> transaction;
}
