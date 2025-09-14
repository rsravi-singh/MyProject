package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entity.Customer;
import com.sunbeam.entity.Status;

public interface CustomerDao extends JpaRepository<Customer, Long>{
	List<Customer> findByAuth_Status(Status verified);

	Optional<Customer> findByAuth_Email(String username);
	List<Customer> findAllByAuth_StatusOrderById(Status status);
	
	// Alternative method if you want to join fetch any required relations
    @Query("SELECT c FROM Customer c JOIN FETCH c.auth a WHERE a.status = 'PENDING' and c.deleted = false")
    List<Customer> findPendingCustomers();

	Customer findByAuth_Id(Long id);
}
