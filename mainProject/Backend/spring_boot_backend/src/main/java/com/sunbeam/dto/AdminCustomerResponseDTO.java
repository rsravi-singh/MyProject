package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.AddressEntity;
import com.sunbeam.entity.Status;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AdminCustomerResponseDTO {
    @NotNull(message = "Customer ID cannot be null")
    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;

    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "^(MALE|FEMALE|OTHER)$", message = "Gender must be MALE, FEMALE or OTHER")
    private String gender;

    @NotBlank(message = "Nationality is required")
    private String nationality;

    @NotBlank(message = "Photo ID is required")
    private String photoId;
    
    @NotNull
    private byte[] photo;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotNull(message = "Address cannot be null")
    private AddressDTO address;
    
    @NotNull(message = "Address cannot be null")
    private CardDetailResponseDTO carddetail;

    @NotBlank(message = "Account number is required")
    @Size(min = 8, max = 20, message = "Account number must be between 8 and 20 characters")
    private AccountDTO account;

    @NotNull(message = "Balance cannot be null")
    @DecimalMin(value = "0.0", message = "Balance cannot be negative")
    private double balance;

    @NotNull(message = "Account status cannot be null")
    private Status status;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    private boolean is_delete = false;
}
