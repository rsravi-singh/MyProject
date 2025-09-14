package com.sunbeam.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
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
public class CardRequestDTO {
	@Future
	private LocalDate expiry;
}
