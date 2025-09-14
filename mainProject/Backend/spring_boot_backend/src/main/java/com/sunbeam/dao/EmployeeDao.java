package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.EmployeeEntity;

public interface EmployeeDao extends JpaRepository<EmployeeEntity, Long> {

	Optional<EmployeeEntity> findById(Long userId);

	boolean existsByEmail(String email);
	List<EmployeeEntity> findAllByOrderByCreatedAtDesc();

	Optional<EmployeeEntity> findByAuth_Id(Long userId);

}
