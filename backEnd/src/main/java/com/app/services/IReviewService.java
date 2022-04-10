package com.app.services;



import java.util.List;

import com.app.model.Review;
import com.app.payload.ReviewPayload;

public interface IReviewService {

  List<Review> getAllReviews(final String campgroundId);

  Review createReview(final String campgroundId, final ReviewPayload reviewPayload);

  Review updateReview(
      final String campgroundId, final String reviewId, final ReviewPayload updateReviewPayload);

  void deleteReview(String campgroundId, String reviewId);
}
