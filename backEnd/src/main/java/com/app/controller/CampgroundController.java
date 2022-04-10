package com.app.controller;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Campground;
import com.app.services.ICampgroundService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins ="http://localhost:3000")

@RestController
@RequestMapping("/campgrounds")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class CampgroundController {

	
	  private final ICampgroundService campgroundService;
	  @GetMapping("/all")
	  public ResponseEntity<List<Campground>> getAllCampgrounds(){
	     List<Campground> campList=campgroundService.getAllCampgrounds();	
	   
//	     return  new ResponseEntity<List<Campground>>(campList, HttpStatus.OK);
	     return ResponseEntity.ok().body(campList);
	  }
	 
	  @GetMapping("/id/{id}")
	  public ResponseEntity<Campground> getById(@PathVariable("id") final String id){
		  System.out.println("in id");
		 
		  return ResponseEntity.ok().body(campgroundService.getById(id));
		 
	  }
	  @GetMapping("/city/{city}")
	  public ResponseEntity<List<Campground>> getByCity(@PathVariable("city") final String city){
		  System.err.println("in getby city");
		  return ResponseEntity.ok().body(campgroundService.getByCity(city));
	  }
	  @GetMapping("/state/{state}")
	  public ResponseEntity<List<Campground>> getByState(@PathVariable("state") final String state){
		  System.err.println("in getby state");
		  return ResponseEntity.ok().body(campgroundService.getByState(state));
	  }
	  @GetMapping("/country/{country}")
	  public ResponseEntity<List<Campground>> getByCountry(@PathVariable("country") final String country){
		  System.err.println("in getby country");
		  return ResponseEntity.ok().body(campgroundService.getByCountry(country));
	  }
		@PreAuthorize("hasAnyRole('USER','ADMIN')")
	
	  @PostMapping("/create")
	  public ResponseEntity<Campground> createCampground(
	      @RequestBody @Valid final Campground campground) {

	    return ResponseEntity.ok().body(campgroundService.createCampground(campground));
	  }
	@PreAuthorize("hasAnyRole('USER','ADMIN')")

	  @PutMapping("/{campgroundId}")
	  public ResponseEntity<Campground> updateCampground(
	      @PathVariable("campgroundId") final String campgroundId,
	      @RequestBody @Valid final Campground campground) {

	    return ResponseEntity.ok().body(campgroundService.updateCampground(campgroundId, campground));
	  }
	@PreAuthorize("hasAnyRole('USER','ADMIN')")

	  @DeleteMapping("/{campgroundId}")
	  public ResponseEntity<Campground> deleteCampground(
	      @PathVariable("campgroundId") final String campgroundId) {

	    campgroundService.deleteCampground(campgroundId);

	    return ResponseEntity.noContent().build();
	  }
}
