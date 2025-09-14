package com.sunbeam.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

import com.sunbeam.entity.Status;
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDTO {
    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name cannot exceed 100 characters")
    private String fullName;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "^(MALE|FEMALE|OTHER)$", message = "Gender must be MALE, FEMALE or OTHER")
    private String gender;

    @NotBlank(message = "Nationality is required")
    @Size(max = 50, message = "Nationality cannot exceed 50 characters")
    private String nationality;

    private String photoId;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @NotBlank(message = "Address line 1 is required")
    @Size(max = 100, message = "Address line 1 cannot exceed 100 characters")
    private String adrLine1;

    @Size(max = 100, message = "Address line 2 cannot exceed 100 characters")
    private String adrLine2;

    @NotBlank(message = "City is required")
    @Size(max = 50, message = "City cannot exceed 50 characters")
    private String city;

    @NotBlank(message = "State is required")
    @Size(max = 50, message = "State cannot exceed 50 characters")
    private String state;

    @NotBlank(message = "Country is required")
    @Size(max = 50, message = "Country cannot exceed 50 characters")
    private String country;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[0-9]{5,10}$", message = "Pincode must be 5-10 digits")
    private long pincode;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Mobile number must be 10-15 digits")
    private String phoneNumber;

    @NotNull
    private Status status;
    
    @NotNull
    private byte[] photo;

}

