package com.app.model;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotEmpty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Document("users")
@NoArgsConstructor
public class User {
	@Id
private String id;
	@NotEmpty
private String username;
	@NotEmpty
private String password;
	@NotEmpty
private String email;
@DBRef private Image image;
private Set<Role> roles = new HashSet<>();

public User(String name,String email, String pass) {
	this.email=email;
	this.username=name;
	this.password=pass;
}
@Override
public String toString() {
	return "User [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email + ", roles="
			+ roles + "]";
}


}
