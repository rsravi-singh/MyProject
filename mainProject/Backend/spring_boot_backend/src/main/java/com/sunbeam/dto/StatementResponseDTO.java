package com.sunbeam.dto;

import jakarta.validation.Valid;
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
import java.util.List;

import com.sunbeam.entity.AddressEntity;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class StatementResponseDTO {

    @NotBlank(message = "Customer name cannot be blank")
    @Size(max = 100, message = "Customer name must be less than 100 characters")
    private String customerName;

    @NotBlank(message = "Address cannot be blank")
    @Size(max = 200, message = "Address must be less than 200 characters")
    private AddressEntity address;

    @NotBlank(message = "Current balance cannot be blank")
    @Pattern(regexp = "^-?\\d+(\\.\\d{1,2})?$", message = "Current balance must be a valid monetary value")
    private String currentBalance;

    @NotNull(message = "Transactions list cannot be null")
    @Valid // Ensures validation cascades to TransactionSummaryDTO objects
    private List<TransactionSummaryResponseDto> transactions;
  
    // Utility method to convert balance to BigDecimal
    public BigDecimal getCurrentBalanceAsBigDecimal() {
        return new BigDecimal(currentBalance);
    }
}
