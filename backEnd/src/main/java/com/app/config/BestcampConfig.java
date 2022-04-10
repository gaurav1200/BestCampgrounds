package com.app.config;

import lombok.Getter;
import lombok.Setter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration

public class BestcampConfig {
	@Value("${SECRET_KEY}")
  private String jwtSecret;
	@Value("${EXP_TIMEOUT}")
  private Long jwtExpirationMs;
}
