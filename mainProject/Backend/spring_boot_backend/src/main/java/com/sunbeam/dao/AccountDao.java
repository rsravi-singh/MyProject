package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.Customer;

public interface AccountDao extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findByAccountNumber(String accountNumber);

    @Query("SELECT a FROM AccountEntity a JOIN FETCH a.customer WHERE a.customer.id = :customerId")
    Optional<AccountEntity> findByCustomerId(Long customerId);
}
