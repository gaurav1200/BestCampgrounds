package com.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document("roles")
@NoArgsConstructor
public class Role {

  @Id String id;

  @Field("role")
  private RoleEnum userRole;

  public Role(RoleEnum name) {
    this.userRole = name;
  }

@Override
public String toString() {
	return "Role [id=" + id + ", userRole=" + userRole + "]";
}

@Override
public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((id == null) ? 0 : id.hashCode());
	result = prime * result + ((userRole == null) ? 0 : userRole.hashCode());
	return result;
}


}
