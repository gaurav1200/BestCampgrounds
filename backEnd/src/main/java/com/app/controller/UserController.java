package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.exception.BestCampException;
import com.app.exception.RequestValidationException;
import com.app.model.Image;
import com.app.model.Role;
import com.app.model.RoleEnum;
import com.app.model.User;
import com.app.payload.ChangePassPayload;
import com.app.payload.MessageResponse;
import com.app.payload.SignUpRequest;
import com.app.repository.UserRepository;
import com.app.services.IImageService;
import com.app.services.IUserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins ="http://localhost:3000")

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserController {
private final IUserService userService;
private final PasswordEncoder passwordEncoder;
private final UserRepository userRepository;



@GetMapping("/id/{id}")
public ResponseEntity<User> getById(@PathVariable("id") final String id){
	  System.out.println("in user id");
	 
	  return ResponseEntity.ok().body(userService.getUserById(id));
	 
}


@PostMapping("/changePass/{id}")

public ResponseEntity<MessageResponse> changePassword(@PathVariable("id") final String id, @RequestBody @Valid ChangePassPayload passwordPayload)
    throws RequestValidationException {
	  System.out.println("in changepass");

User u=userService.getLoggedInUser();
User u2=userService.getUserById(id);


if(!u.getId().equals(u2.getId())) {
	throw new BestCampException("You can't change password");
}
  System.out.println(passwordPayload.getNewPass());
          u2.setPassword(
          passwordEncoder.encode(passwordPayload.getNewPass()));
	 


  userRepository.save(u2);
	 

  return ResponseEntity.ok().body(new MessageResponse("Password Change successfully"));
}

@PostMapping("/image/{id}")
public ResponseEntity<User> addProfileImage(@PathVariable("id")final String uId,@RequestBody @Valid Image img){
	User u=userService.getLoggedInUser();
	User u2=userService.getUserById(uId);

	if(!u.getId().equals(u2.getId())) {
		throw new BestCampException("You can't add profile image");
		
	}
		
	 return ResponseEntity.ok().body(userService.addProfileImage(uId, img));
}

}
