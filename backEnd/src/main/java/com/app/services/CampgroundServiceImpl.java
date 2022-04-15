package com.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.exception.NotAllowedException;
import com.app.exception.NotFoundException;
import com.app.model.Campground;
import com.app.model.Review;
import com.app.model.Role;
import com.app.model.RoleEnum;
import com.app.model.User;
import com.app.repository.CampgroundRepository;
import com.app.repository.ImageRepository;
import com.app.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class CampgroundServiceImpl implements ICampgroundService {
	  private final CampgroundRepository campgroundRepository;
	  private final IUserService userService;
	 
	  private final ImageRepository imageRepo;
	  private final ReviewRepository reviewRepo;

	public List<Campground> getAllCampgrounds() {
		// TODO Auto-generated method stub
		System.out.println("in all camps1");
		List<Campground> list=campgroundRepository.findAll();
		System.out.println("in all camps2");
		
		 return list;
	}

	@Override
	public Campground getById(String id) {
		Optional<Campground> camp;
		System.out.println("in get by id");

		camp=campgroundRepository.findById(id);
		return campgroundRepository.findById(id).orElseThrow(()->new NotFoundException("Campground Not Found"));
	}

	@Override
	public List<Campground> getByCity(String city) {
		
		List<Campground> list=campgroundRepository.findByCity(city);

		
		 return list;
	}

	@Override
	public List<Campground> getByState(String state) {


		List<Campground> list=campgroundRepository.findByState(state);

		
	 return list;
	}

	@Override
	public List<Campground> getByCountry(String country) {
		List<Campground> list;
		if(country.length()==0) {
			System.out.println(country.length());
			list=campgroundRepository.findAll();
		}else {
		 list=campgroundRepository.findByCountry(country);
		}
		System.out.println(list);
		 return list;
	}
	 @Override
	  public Campground save(final Campground campground) {

	    return campgroundRepository.save(campground);
	  }


	  @Override
	  public Campground createCampground(Campground campground) {

	    
	        String name= SecurityContextHolder.getContext().getAuthentication().getName();

	    final User byUsername = userService.getUserByUsername(name);

	    final Campground campgroundDocument = campground;
	    campgroundDocument.setAuthor(byUsername.getId());
	    System.out.println("befor save camp :::"+campgroundDocument);

	    final Campground savedCampgroundDocument = campgroundRepository.save(campgroundDocument);
	    System.out.println("afeter save camp :::"+savedCampgroundDocument);

	    return savedCampgroundDocument;
	  }
	  
	  @Override
	  public Campground updateCampground(
	      String campgroundId, Campground campgroundPayload) {

	    final Campground foundCampgroundDocument = this.validateUserCampgroundAndGet(campgroundId);
       
	   
	    foundCampgroundDocument.setCity(campgroundPayload.getCity());
	    foundCampgroundDocument.setCountry(campgroundPayload.getCountry());
	    foundCampgroundDocument.setDescription(campgroundPayload.getDescription());
	    foundCampgroundDocument.setPrice(campgroundPayload.getPrice());
	    foundCampgroundDocument.setState(campgroundPayload.getState());
	    foundCampgroundDocument.setTitle(campgroundPayload.getTitle());
	    final Campground updatedCampground =foundCampgroundDocument;

	    return campgroundRepository.save(updatedCampground);
	  }
	  @Override
	  public Campground validateUserCampgroundAndGet(String campgroundId) {

	    final Campground foundCampgroundDocument = this.getById(campgroundId);

	    String name= SecurityContextHolder.getContext().getAuthentication().getName();

	    final User byUsername = userService.getUserByUsername(name);
	    final Role role =new Role(RoleEnum.ROLE_ADMIN);
	    System.out.println(byUsername.getRoles().stream().anyMatch(r->(r.getUserRole()==role.getUserRole())));
	    boolean check=byUsername.getRoles().stream().anyMatch(r->(r.getUserRole()==role.getUserRole()));

	    if ( !check && !byUsername.getId().equals(foundCampgroundDocument.getAuthor())) {
	      throw new NotAllowedException("Campground does not belong to User :: " + byUsername.getId());
	    }

	    return foundCampgroundDocument;
	  }
	  @Override
	  public void deleteCampground(final String campgroundId) {

	    final Campground foundCampgroundDocument = validateUserCampgroundAndGet(campgroundId);
        Review review=new Review();
        foundCampgroundDocument.getReviews().forEach(r->{
        reviewRepo.deleteById(r.getId());
        });
        foundCampgroundDocument.getImages().forEach(i->{
        	imageRepo.deleteById(i.getId());
        });
	    campgroundRepository.delete(foundCampgroundDocument);
	  }
	@Override
	public List<Campground> getByAuthor(String author) {
		User u=userService.getUserByUsername(author);
		List<Campground> list= campgroundRepository.findByAuthor(u.getId());
		return list;
	}
}
