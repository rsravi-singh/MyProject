package com.sunbeam.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminResponseDTO {

    private Long id;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^\\+?[0-9]{10,15}$",
        message = "Phone number must be 10-15 digits (optional + prefix)"
    )
    private String phoneNumber;
}
