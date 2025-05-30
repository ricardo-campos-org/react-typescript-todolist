package br.com.tasknoteapp.server.service;

import br.com.tasknoteapp.server.entity.UserEntity;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetails;

/** This interface contains methods for handling user JWT tokens. */
public interface JwtService {

  public String getEmailFromToken(String token);

  public LocalDateTime extractExpiration(String token);

  public String generateToken(UserEntity user);

  public String createToken(Map<String, Object> claims, String email);

  public boolean isTokenExpired(String token);

  public boolean validateTokenAndUser(String token, UserDetails user);
}
