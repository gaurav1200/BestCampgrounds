package com.app.services;

import java.util.List;

import com.app.model.Campground;



public interface ICampgroundService {
	  List<Campground> getAllCampgrounds();
	 Campground getById(String id);
	 List<Campground> getByCity(String city);
	 List<Campground> getByState(String state);
	 List<Campground> getByCountry(String country);
	  Campground save(final Campground campground);
	  Campground createCampground(final Campground campground);
	  Campground updateCampground(
		      final String campgroundId, final Campground campgroundPayload);
	   Campground validateUserCampgroundAndGet(String campgroundId) ;
List<Campground> getByAuthor(String name);

		  void deleteCampground(final String campgroundId);

}
