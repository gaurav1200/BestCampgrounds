package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.app.model.Review;
import com.app.payload.ReviewPayload;
import com.app.services.IReviewService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/campgrounds/id/{campgroundId}/reviews")
@PreAuthorize("hasAnyRole('USER','ADMIN')")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ReviewController {

  private final IReviewService reviewService;

  @PostMapping
  public ResponseEntity<Review> createReview(
      @PathVariable("campgroundId") final String campgroundId,
      @RequestBody @Valid final ReviewPayload createReviewPayload) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(reviewService.createReview(campgroundId, createReviewPayload));
  }

  @GetMapping
  public ResponseEntity<List<Review>> getAllReviews(
      @PathVariable("campgroundId") final String campgroundId) {

    return ResponseEntity.ok().body(reviewService.getAllReviews(campgroundId));
  }

  @PutMapping("/{reviewId}")
  public ResponseEntity<Review> updateReview(
      @PathVariable("campgroundId") final String campgroundId,
      @PathVariable("reviewId") final String reviewId,
      @RequestBody @Valid final ReviewPayload updateReviewPayload) {

    return ResponseEntity.status(HttpStatus.ACCEPTED)
        .body(reviewService.updateReview(campgroundId, reviewId, updateReviewPayload));
  }

  @DeleteMapping("/{reviewId}")
  public ResponseEntity<Review> deleteReview(
      @PathVariable("campgroundId") final String campgroundId,
      @PathVariable("reviewId") final String reviewId) {

    reviewService.deleteReview(campgroundId, reviewId);

    return ResponseEntity.noContent().build();
  }
}
