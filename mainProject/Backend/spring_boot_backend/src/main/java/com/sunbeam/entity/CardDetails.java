package com.sunbeam.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "card_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String holderName;
    private String cardNumber;
    private LocalDate expiry;
    private Integer cvv;
    private String type;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private AccountEntity account;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime modifiedAt;
	@Override
	public String toString() {
		return "CardDetails [id=" + id + ", holderName=" + holderName + ", cardNumber=" + cardNumber + ", expiry="
				+ expiry + ", cvv=" + cvv + ", type=" + type + ", createdAt=" + createdAt + ", modifiedAt=" + modifiedAt
				+ "account=" + (account != null ? account.getId() : null)+ "]";
	}
    
    
}