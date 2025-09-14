package com.sunbeam.service;

import java.time.LocalDate;

import com.sunbeam.dto.StatementRequestDTO;
import com.sunbeam.dto.StatementResponseDTO;

public interface StatementService {

	

	public StatementResponseDTO getStatement(StatementRequestDTO requestDTO);

}
 