package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Image;
import com.app.model.Review;
import com.app.payload.ReviewPayload;
import com.app.services.IImageService;
import com.app.services.IReviewService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/campgrounds/id/{campgroundId}/images")
@PreAuthorize("hasAnyRole('USER','ADMIN')")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ImageController {
  private final IImageService imageSevice;
  
  
  @PostMapping
  public ResponseEntity<Image> addImage(
      @PathVariable("campgroundId") final String campgroundId,
      @RequestBody @Valid final Image addImagePayload) {
	
	final Image img= imageSevice.addImage(campgroundId, addImagePayload);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(img);
  }
  @DeleteMapping("/{filename}")
  public ResponseEntity<Review> deleteImage(
      @PathVariable("campgroundId") final String campgroundId,
      @PathVariable("filename") final String name) {

    imageSevice.deleteImage(campgroundId, name);

    return ResponseEntity.noContent().build();
  }
}
