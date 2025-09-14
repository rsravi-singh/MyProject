package com.sunbeam.dto;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardDetailResponseDTO {    
	@NotBlank(message = "Card number is required")
    private String cardNumber;
    
    @NotBlank(message = "Expiry date is required")
//    @Pattern(regexp = "^(0[1-9]|1[0-2])\\/?([0-9]{2})$", 
//             message = "Expiry date should be in MM/YY format")
    private LocalDate expiry;
    
    @NotNull(message = "CVV is required")
    @Min(value = 100, message = "CVV should be 3 digits")
    @Max(value = 999, message = "CVV should be 3 digits")
    private Integer cvv;
    
    @NotBlank(message = "Card type is required")
    private String type;
}
