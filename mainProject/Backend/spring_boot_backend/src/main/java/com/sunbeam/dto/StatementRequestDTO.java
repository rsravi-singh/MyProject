package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.TransactionType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class StatementRequestDTO {

	@NotBlank(message ="account no can't be blank")
	private String accountNo;
	
	@NotBlank
	private TransactionType transactionType;
	
	@NotBlank(message = "Enter starting date:")
	@NotNull
	private LocalDate dateTimeFrom ;
	
	@NotBlank(message ="Enter ending date:" )
	@NotNull
	private LocalDate dateTimeTo;
	
	
	
	
	
	
	
}
