package com.sunbeam.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

import com.sunbeam.entity.IdType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class EmployeeResponseDTO {
	
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotNull(message = "firstname is required")
    private String firstName;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Invalid phone number format")
    private String phoneNumber;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;

    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "^(Male|Female|Other)$", message = "Gender must be Male, Female or Other")
    private String gender;

    @NotBlank(message = "Government ID is required")
    private String govtId;
    
    @NotNull(message = "lastname is required")
  	private String lastName;
    
    @NotNull(message = "password is required")
    private String password;

    @Size(max = 50, message = "Photo ID must be less than 50 characters")
    private IdType govtIdType;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "^(Active|Inactive|Pending)$", message = "Status must be Active, Inactive or Pending")
    private String status;

}