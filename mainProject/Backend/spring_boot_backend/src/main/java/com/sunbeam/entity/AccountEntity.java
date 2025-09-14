package com.sunbeam.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="account_number", unique = true)
    private String accountNumber;
    private double balance;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    @OneToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private CardDetails cardDetails;

	@Override
	public String toString() {
		return "AccountEntity [id=" + id + ", accountNumber=" + accountNumber + ", balance=" + balance + ", status="
				+ status + ", customer=" + + (customer != null ? customer.getId() : null)+ ", cardDetails=" + (cardDetails != null ? cardDetails.getId() : null) + "]";
	}
    
}
