package com.sunbeam.custom_exceptions;

public class AuthenticationFailureException extends RuntimeException {
	public AuthenticationFailureException(String mesg) {
		super(mesg);
	}
}
