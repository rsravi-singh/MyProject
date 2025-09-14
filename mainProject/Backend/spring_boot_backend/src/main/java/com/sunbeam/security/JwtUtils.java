package com.sunbeam.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.entity.UserAuth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {
	
	@Value("${jwt.secret.key}")
	private String jwtSecret;
	
	@Value("${jwt.expiration.time}")
	private int jwtExpirationMs;
	
	private final UserDao userDao;
	
	private final ModelMapper modelMapper;
	
	 public JwtUtils(UserDao userDao, ModelMapper modelMapper) {
	        this.userDao = userDao;
	        this.modelMapper = modelMapper;
	    }

	private SecretKey key;
	
	@PostConstruct
	public void init()
	{
		log.info("Key {} Exp Time {}",jwtSecret,jwtExpirationMs);
		
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	public String generateJwtToken(Authentication authentication)
	{
		log.info("generate jwt token " + authentication);// contains verified user details
		UserAuth userPrincipal = 
				(UserAuth) authentication.getPrincipal();
		System.out.println(userPrincipal.getUsername());
		
		return Jwts.builder().subject(userPrincipal.getUsername())
				.issuedAt(new Date()).expiration(new Date((new Date()).getTime()+jwtExpirationMs))
				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
				.claim("id", userPrincipal.getId())
				.signWith(key, Jwts.SIG.HS256).compact();
	}
	
	
	private List<String> getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		return authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
	}
	
	public Authentication populateAuthenticationTokenFromJWT(String jwt)
	{
		if (jwt == null || jwt.isBlank()) {
		    throw new RuntimeException("JWT is missing");
		}
		Claims payloadClaims = validateJwtToken(jwt);
		System.out.println(payloadClaims);
		String email = getUserNameFromJwtToken(payloadClaims);
		System.out.println(email);
		UserAuth user = userDao.findByEmail(email).orElseThrow(() -> new InvalidInputException("Account Number Invalid"));
//		UserEntity userEntity = modelMapper.map(user, User.class);
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, null, authorities);
		return token;
	}
	
	public Claims validateJwtToken(String jwtToken) 
	{
		System.out.println(jwtToken);
		return Jwts.parser().verifyWith(key).build().parseSignedClaims(jwtToken).getPayload();
	}
	
	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}
	
	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {

		List<String> authorityNamesFromJwt = (List<String>) claims.get("authorities");
		List<GrantedAuthority> authorities = 
				authorityNamesFromJwt.stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());		

		authorities.forEach(System.out::println);
		return authorities;
	}
	
}
