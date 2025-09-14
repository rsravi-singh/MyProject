package com.sunbeam.security;

import java.util.List;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration 
@EnableWebSecurity 
@EnableMethodSecurity 
@AllArgsConstructor
public class SecurityConfiguration {
	

	private final CustomJwtFilter customJwtFilter;
	private JwtAuthEntryPoint jwtAuthEntryPoint;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		
		http.csrf(csrf -> csrf.disable());
		
		http
		.cors(cors -> {}) // 👈 enable Spring Security CORS handling
        .csrf(csrf -> csrf.disable()) // if using stateless API with JWT
		.authorizeHttpRequests(request -> request
		        // Public endpoints
		        .requestMatchers(
		            "/swagger-ui/**",
		            "/v3/api-docs/**",
		            "/user/login",
		            "/user/signup",
		            "/user/verifyOtp",
		            "/home/fd-rates",
		            "/home/loan-rates",
		            "/admin/add"
		        ).permitAll()
		        // Role-based access
		        .requestMatchers("/admin/**", "/employee/delete/**", "/customer/delete/**","/customer/activate/**", "/employee/employeecreate/**").hasRole("ADMIN")
		        .requestMatchers("/employee/**", "/employeeprofile").hasRole("EMPLOYEE")
		        .requestMatchers("/customer/**", "/user/profile").hasRole("CUSTOMER")

		        // Any other request must be authenticated
		        .anyRequest().authenticated()
		    );
		
		http.sessionManagement(session -> 
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.addFilterBefore(customJwtFilter
				, UsernamePasswordAuthenticationFilter.class);
		
		http.exceptionHandling
		(ex -> ex.authenticationEntryPoint(jwtAuthEntryPoint));
		return http.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager
	(AuthenticationConfiguration mgr) throws Exception {
		return mgr.getAuthenticationManager();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	
	
}
