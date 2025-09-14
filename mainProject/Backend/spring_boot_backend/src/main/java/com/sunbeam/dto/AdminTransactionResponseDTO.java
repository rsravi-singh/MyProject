package com.sunbeam.dto;

import java.time.LocalDateTime;

import com.sunbeam.entity.Status;
import com.sunbeam.entity.TransactionMode;
import com.sunbeam.entity.TransactionType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class AdminTransactionResponseDTO {
    @NotNull
    @Positive(message = "Account should be positive")
    private String senderAccount;

    @NotNull
    @Positive(message = "Account should be positive")
    private String receiverAccount;

    private String senderName;
    private String senderEmail;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount should be positive")
    private Float amount;

    @NotNull(message = "Transaction mode is required")
    private TransactionMode transactionMode;

    @NotNull(message = "Transaction type is required")
    private TransactionType transactionType;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Timestamp is required")
    private LocalDateTime createdAt;

    @NotNull(message = "Status is required")
    private Status status;
}

