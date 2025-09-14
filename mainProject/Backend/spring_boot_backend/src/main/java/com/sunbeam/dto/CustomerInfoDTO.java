package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.Status;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInfoDTO {
	private Long id;
	private String firstName;
	private String lastName;
	private LocalDate dob;
	private String gender;
	private String nationality;
	private String photoId;
	private Long phoneNumber;
	private boolean deleted;
    private byte[] photo;
}
