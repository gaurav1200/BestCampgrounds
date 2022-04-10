package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exception.BestCampException;
import com.app.exception.RequestValidationException;
import com.app.model.Campground;
import com.app.model.Image;
import com.app.model.Review;
import com.app.model.User;
import com.app.repository.ImageRepository;
import com.app.repository.ReviewRepository;
import com.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ImageServiceImpl implements IImageService {
	  private final IUserService userService;

	  private final ICampgroundService campgroundService;
	  private final ImageRepository imageRepository;
private final UserRepository userRepo;	 

	  
	  private Image imageByFilename(String name) {
		  Image img=imageRepository.findByFilename(name);
		  return img;
	  }
	@Override
	public synchronized Image addImage(String campId, Image img) {

	    final Campground campgroundById = campgroundService.getById(campId);
//	    final User loggedInUser = userService.getLoggedInUser();
	    
	   final Image image=new Image();
	    image.setFilename(img.getFilename());
	    image.setUrl(img.getUrl());
	    System.out.println("in image save");
	    
Image saveImage=imageRepository.save(image);
if(!campgroundById.getImages().add(saveImage)) {
	System.out.println("image save in camp failed");
	throw new BestCampException();
}
System.out.println("image save in camp ");


campgroundService.save(campgroundById);
		return saveImage;
	}

	@Override
	public List<Image> getAllImages(String campId) {
		final Campground campgroundById= campgroundService.getById(campId);
		
		return campgroundById.getImages().stream().collect(Collectors.toList());
	}
	private Image getImage(String id) {
		
		return imageRepository.findById(id)
				.orElseThrow(() -> new RequestValidationException("No image found with id :: " + id));

	}
	  private boolean isNotCampgroundImage(final Campground campgroundById, final String imgId) {

		    return campgroundById.getImages()
		    		.stream()
		        .noneMatch(image -> image.getId().equals(imgId));
		  }

	@Override
	public synchronized void deleteImage(String campId, String name) {
		 Image image=imageByFilename(name);
		 Campground campgroundById=campgroundService.getById(campId);
		 
		  if (isNotCampgroundImage(campgroundById, image.getId())) {

		      throw new RequestValidationException(
		          "Review does not being to campground :: " + campgroundById.getAuthor());
		    }
		  imageRepository.delete(image);
		  
		  final List<Image> updatedImageList =
			        campgroundById.getImages().stream()
			            .filter(img -> !img.getId().equals(image.getId()))
			            .collect(Collectors.toList());
		  campgroundById.setImages(updatedImageList);

		    campgroundService.save(campgroundById);
	}



	

}
