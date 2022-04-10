package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.exception.NotFoundException;
import com.app.model.Image;
import com.app.model.User;
import com.app.repository.ImageRepository;
import com.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserServiceImpl implements IUserService {
	 final UserRepository userRepository;
	 final ImageRepository imageRepo;
	@Override
	public boolean existsByUsername(String username) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean existsByEmail(String email) {
		// TODO Auto-generated method stub
		return false;
	}



	@Override
	public User getLoggedInUser() {
		// TODO Auto-generated method stub
		System.out.println("in get login user");
		 String name= SecurityContextHolder.getContext().getAuthentication().getName();
		 System.out.println("in get login user2");
		 System.out.println(name);
			    return getUserByUsername(name);	}

	@Override
	public User getUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository
		        .findByUsername(username)
		        .orElseThrow(() -> new NotFoundException("User not found."));	}

	@Override
	public User getUserById(String id) {
		// TODO Auto-generated method stub
		User user=userRepository.findById(id).orElseThrow(()->new NotFoundException("User Not Found"));
		return user;
	}

	@Override
	public User addProfileImage(String uId, Image img) {
		User u=getUserById(uId);
		   final Image image=new Image();
		    image.setFilename(img.getFilename());
		    image.setUrl(img.getUrl());
		    Image saveImage=imageRepo.save(image);
		    u.setImage(saveImage);
		    userRepository.save(u);
		    System.out.println("profile image saved");
		return u;
	}

}
