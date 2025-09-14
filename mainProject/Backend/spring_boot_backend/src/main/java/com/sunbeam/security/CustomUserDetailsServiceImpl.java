package com.sunbeam.security;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dao.UserDao;
import com.sunbeam.entity.UserAuth;

import lombok.AllArgsConstructor;



@Service 
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	
	private final UserDao userDao;
//	private final ModelMapper modelmapper;

	@Override
	public UserDetails loadUserByUsername(String email) 
			throws UsernameNotFoundException {
		// invoke dao's method
		UserAuth user= userDao.findByEmail(email)
				.orElseThrow(() ->
				new UsernameNotFoundException("Invalid email !!!!"));
		return user;
	}

}
