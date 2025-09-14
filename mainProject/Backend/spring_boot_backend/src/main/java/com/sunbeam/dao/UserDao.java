package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.UserAuth;

public interface UserDao extends JpaRepository<UserAuth, Long> {

	// Use only if passwords are NOT encrypted (NOT recommended for production)
	Optional<UserAuth> findByEmailAndPassword(String email, String password);

	Optional<UserAuth> findByEmail(String email);

	// Already inherited from JpaRepository<UserAuth, Long>
	Optional<UserAuth> findById(Long userId);
	

//	Optional<UserAuth> findByAccount(AccountEntity account);

	List<UserAuth> findByStatus(Status verified);


}
