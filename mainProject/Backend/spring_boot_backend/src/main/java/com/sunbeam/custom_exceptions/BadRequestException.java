package com.sunbeam.custom_exceptions;

public class BadRequestException extends RuntimeException {
	public BadRequestException(String mesg) {
		super(mesg);
	}
}
