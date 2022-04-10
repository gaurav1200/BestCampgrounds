package com.app.services;

import com.app.model.*;

public interface IUserService {

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  User getUserByUsername(String username);
  
  User getUserById(String id);

  User getLoggedInUser();
  User addProfileImage(final String uId, final Image img);
}
