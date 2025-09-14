package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class UserDTO {
	
	 private Long customerId;
	 private String firstName;
	 private String lastName;
	 private String address;
	 private String mobileNo;
	 private String email;
	 private String role;
	

}
