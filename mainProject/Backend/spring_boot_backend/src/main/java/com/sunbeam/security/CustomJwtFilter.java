package com.sunbeam.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component 
@Slf4j
@AllArgsConstructor
public class CustomJwtFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String headerValue = request.getHeader("Authorization");
		if (headerValue != null && headerValue.startsWith("Bearer ")) {
			
			String jwt = headerValue.substring(7);
			log.info("JWT in request header {} ", jwt);
			
			try {
	            Authentication authentication = jwtUtils.populateAuthenticationTokenFromJWT(jwt);
	            log.info("auth object from JWT {} ", authentication);
	            SecurityContextHolder.getContext().setAuthentication(authentication);
	        } catch (io.jsonwebtoken.ExpiredJwtException ex) {
	            log.warn("JWT expired: {}", ex.getMessage());
	            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	            response.setContentType("application/json");
	            response.getWriter().write("{\"message\": \"Your JWT expired. Please log in again.\"}");
	            return; // stop filter chain here
	        }

		}
		
		filterChain.doFilter(request, response);

	}

}
