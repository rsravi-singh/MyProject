package com.sunbeam.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminRequestDTO {

	private String email;
    private String password;
    private String phoneNumber;
}
