package com.sunbeam.entity;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    private Long id;

    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String nationality;
    private String photoId;
    @Column(name = "phone_number", unique = true)
    private Long phoneNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private AddressEntity address;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private AccountEntity account;

    @Column(name = "is_deleted")
    private boolean deleted = false;
    
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] photo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "auth_id")
    private UserAuth auth;

	@Override
	public String toString() {
		return "Customer [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", dob=" + dob
				+ ", gender=" + gender + ", nationality=" + nationality + ", photoId=" + photoId + ", phoneNumber="
				+ phoneNumber + ", address=" + address + ", account=" + account + ", deleted=" + deleted + ", auth="
				+ auth + "]";
	}
    
}
