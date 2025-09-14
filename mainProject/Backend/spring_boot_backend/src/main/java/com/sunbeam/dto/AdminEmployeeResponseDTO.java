package com.sunbeam.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.sunbeam.entity.IdType;
import com.sunbeam.entity.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminEmployeeResponseDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private LocalDate dob;
    private String gender;
    private IdType govtIdType;
    private String govtId;
    private Status status;
    private LocalDateTime createdAt;
}

