package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.CardDetails;
import com.sunbeam.entity.Customer;
import com.sunbeam.entity.Status;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AccountDTO {

	private Long id;


    private String accountNumber;
    private double balance;
 
    private Status status = Status.PENDING;

    private Customer customer;

    private CardDetails cardDetails;

	public AccountDTO(Long id, String accountNumber, double balance, Status status) {
		super();
		this.id = id;
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.status = status;
	}
    
}

