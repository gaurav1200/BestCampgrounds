package com.app.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Role;
import com.app.model.RoleEnum;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

  Optional<Role> findByUserRole(RoleEnum name);
}
