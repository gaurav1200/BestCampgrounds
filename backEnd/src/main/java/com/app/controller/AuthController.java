package com.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.exception.NotFoundException;
import com.app.exception.RequestValidationException;
import com.app.model.Role;
import com.app.model.RoleEnum;
import com.app.model.User;
import com.app.payload.JwtResponse;
import com.app.payload.LoginRequest;
import com.app.payload.MessageResponse;
import com.app.payload.SignUpRequest;
import com.app.repository.RoleRepository;
import com.app.repository.UserRepository;
import com.app.services.JwtService;
import com.app.services.UserDetailsImpl;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class AuthController {

  private final AuthenticationManager authenticationManager;

  private final JwtService jwtService;

  private final UserRepository userRepository;

  private final RoleRepository roleRepository;

  private final PasswordEncoder passwordEncoder;
  
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

    final Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
System.out.println("in singin1");
    final String jwtToken = jwtService.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    System.out.println("in singin2");
    List<String> roles =
        userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
    User user= userRepository.findById(userDetails.getId()).orElseThrow(()->new NotFoundException("user not found"));
    System.out.println("in singin3");
    return ResponseEntity.ok()
        .body(
            new JwtResponse(
                jwtToken,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                user.getImage(),
                roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<User> registerUser(@RequestBody @Valid SignUpRequest signUpRequest)
      throws RequestValidationException {
	  System.out.println("in singup1");

    validateSignUpRequest(signUpRequest);

    final User user =
        new User(
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            passwordEncoder.encode(signUpRequest.getPassword()));
	  System.out.println("in singup2");

    final Role role =//new Role(RoleEnum.ROLE_USER);
        roleRepository
            .findByUserRole(RoleEnum.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
	  System.out.println("in singup3");

    user.getRoles().add(role);

    
	  System.out.println("in singup4");

    return ResponseEntity.ok().body(userRepository.save(user));
  }

  private void validateSignUpRequest(SignUpRequest signUpRequest)
      throws RequestValidationException {

    if (userRepository.existsByUsername(signUpRequest.getUsername())) {

      throw new RequestValidationException("Username is already taken");
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {

      throw new RequestValidationException("Email is already taken");
    }
  }
}
