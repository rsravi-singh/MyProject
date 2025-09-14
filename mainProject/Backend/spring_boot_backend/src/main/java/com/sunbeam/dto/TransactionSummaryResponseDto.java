package com.sunbeam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TransactionSummaryResponseDto {
    
    @NotNull(message = "Date cannot be null")
    private LocalDateTime date;  // Changed to LocalDate for better type safety
    
    @NotBlank(message = "Type cannot be blank")
    @Size(max = 50, message = "Type must be less than 50 characters")
    private String type;
    
    @NotBlank(message = "Amount cannot be blank")
    @Pattern(regexp = "^[0-9]+(\\.[0-9]{1,2})?$", message = "Amount must be a valid monetary value")
    private String amount;
    
    @Size(max = 255, message = "Description must be less than 255 characters")
    private String description;

    // Optional: Utility method to convert amount to BigDecimal
    public BigDecimal getAmountAsBigDecimal() {
        return new BigDecimal(amount);
    }
}
