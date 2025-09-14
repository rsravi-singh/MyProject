package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.IdType;
import com.sunbeam.entity.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDTO {
	

	private String email;

    private String firstName;
    
    private String lastName;

    private String phoneNo;

    private LocalDate dob;

    private String gender;

    private IdType govtIdType;

    private String govtId;

    private String password;

    private Status status;
	
}
