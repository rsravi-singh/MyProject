package com.sunbeam.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.entity.AddressEntity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
	
	@NotBlank(message = "First name cannot be blank")
	private String firstName;
	
	@NotBlank(message = "Last name cannot be blank")
	private String lastName;
	
	@NotNull(message = "Date of birth is required")
	@Past(message = "Date of birth must be in the past")
    private String dateOfBirth;
	@NotBlank(message = "Gender is required")
    @Pattern(regexp = "^(Male|Female|Other)$", message = "Gender must be Male, Female, or Other")
    private String gender;
	@NotBlank(message = "Nationality cannot be blank")
    private String nationality;
	@NotNull(message = "Photo ID is required")
    private String photoId; // For file upload
	@NotBlank(message = "Address cannot be blank")
    private AddressEntity address;
	@NotBlank(message = "Mobile number is required")
    private String phoneNumber;
	@NotBlank(message = "Email is required")
	@Email(message = "Email must be valid (e.g., user@example.com)")
    private String email;
	@NotBlank(message = "Password is required")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "Password must be at least 8 characters with uppercase, lowercase, number and special character")
    private String password;
}
