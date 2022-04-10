package com.app.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {

  @NotNull(message = "Username cannot be empty")
  private String username;

  @NotNull @Email private String email;

  @NotNull
  @Size(min = 6, max = 15)
  private String password;
}
