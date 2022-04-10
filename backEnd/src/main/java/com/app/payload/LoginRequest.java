package com.app.payload;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

  private String username;

  private String password;
}
