package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entity.Transaction;

import jakarta.transaction.Transactional;



public interface TransactionDao extends JpaRepository<Transaction, Long> {
//	List<Transaction> findByUserIdAndCreatedAtLessThanEqual(
//          String userId, LocalDateTime toDate);
//	
	List<Transaction> findByAccount_Id(Long accountId);

	List<Transaction> findTop5ByAccountIdOrderByCreatedAtDesc(Long accountId);

	@Modifying
    @Transactional
    @Query("DELETE FROM Transaction t WHERE t.account.id = :accountId")
    void deleteByAccountId(Long accountId);

//	List<Transaction> findByUserIdAndCreatedAtBetween(
//          Long userId, LocalDateTime fromDate, LocalDateTime toDate);
	
//	List<Transaction> findTop5ByUserIdOrderByCreatedAtDesc(Long id);
	
}
