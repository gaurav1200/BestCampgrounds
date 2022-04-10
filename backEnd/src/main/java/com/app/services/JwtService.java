package com.app.services;

import org.springframework.security.core.Authentication;

public interface JwtService {

  String generateJwtToken(Authentication authentication);

  String getUserNameFromJwtToken(String token);

  boolean validateJwtToken(String authToken);

}
