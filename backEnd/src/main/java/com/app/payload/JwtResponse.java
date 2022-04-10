package com.app.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.app.model.Image;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

  private String jwtToken;

  private String id;

  private String username;

  private String email;
  
  private Image image;

  private List<String> roles;
}
