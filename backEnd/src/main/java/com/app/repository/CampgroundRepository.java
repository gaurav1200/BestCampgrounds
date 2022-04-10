package com.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.model.Campground;



@Repository
public interface CampgroundRepository extends MongoRepository<Campground, String> {
	@Query("{ 'city' : { $regex: ?0 , $options: 'i'} }")
	List<Campground> findByCity(String city);
	@Query("{ 'state' : { $regex: ?0 , $options: 'i'}}")
	List<Campground> findByState(String state);
	@Query("{ 'country' : { $regex: ?0 , $options: 'i'} }")
	List<Campground> findByCountry(String country);
	@Query("{ 'name' : { $regex: ?0 } }")
	List<Campground> findByRegexpName(String regexp);
}
