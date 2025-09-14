package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.CardDetails;
import com.sunbeam.entity.Customer;

public interface CardDao extends JpaRepository<CardDetails, Long> {
	boolean existsByAccount_Id(Long accountId);
}
