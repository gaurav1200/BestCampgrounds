package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.exception.NotAllowedException;
import com.app.exception.RequestValidationException;
import com.app.model.Campground;
import com.app.model.Review;
import com.app.model.Role;
import com.app.model.RoleEnum;
import com.app.model.User;
import com.app.payload.ReviewPayload;
import com.app.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ReviewServiceImpl implements IReviewService {

  private final IUserService userService;

  private final ICampgroundService campgroundService;

  private final ReviewRepository reviewRepository;

  @Override
  public List<Review> getAllReviews(final String campgroundId) {

    final Campground campgroundById = campgroundService.getById(campgroundId);

    return campgroundById.getReviews().stream()
        .collect(Collectors.toList());
  }

  @Override
  public Review createReview(final String campgroundId, final ReviewPayload reviewPayload) {

    final Campground campgroundById = campgroundService.getById(campgroundId);
    System.out.println("in create review");

    final User loggedInUser = userService.getLoggedInUser();
    System.out.println("in create review2");

//    if (isAlreadyReviewed(loggedInUser, campgroundById)) {
//
//      throw new RequestValidationException(
//          "You have already reviewed the campground :: " + campgroundId);
//    }

    final Review review= new Review() ;
    review.setAuthor(loggedInUser);
    review.setBody(reviewPayload.getBody());
    review.setRating(reviewPayload.getRating());
    

    final Review savedReview = reviewRepository.save(review);
    System.out.println(campgroundById.getImages());
    campgroundById.getReviews().add(savedReview);


    campgroundService.save(campgroundById);

    return review;
  }

  private boolean isAlreadyReviewed(final User user, final Campground campground) {

    return campground.getReviews().stream()
        .anyMatch(review -> review.getAuthor().getId().equals(user.getId()));
  }

  @Override
  public Review updateReview(
      final String campgroundId, final String reviewId, final ReviewPayload updateReviewPayload) {

    final Review reviewById = validateUserReviewAndGet(reviewId);

    final Campground campgroundById = campgroundService.getById(campgroundId);

    if (isNotCampgroundReview(campgroundById, reviewById.getId())) {

      throw new RequestValidationException(
          "Review does not being to campground :: " + campgroundId);
    }


    reviewById.setBody(updateReviewPayload.getBody());

    final Review savedReview = reviewRepository.save(reviewById);

    return savedReview;
  }

  private Review validateUserReviewAndGet(String reviewId) {

    final Review reviewById = getReview(reviewId);

    final User loggedInUser = userService.getLoggedInUser();

    final Role role =new Role(RoleEnum.ROLE_ADMIN);
    System.out.println(loggedInUser.getRoles().stream().anyMatch(r->(r.getUserRole()==role.getUserRole())));
    boolean check=loggedInUser.getRoles().stream().anyMatch(r->(r.getUserRole()==role.getUserRole()));
    
    if (!check && !reviewById.getAuthor().getId().equals(loggedInUser.getId())) {

      throw new NotAllowedException("Review does not being to user :: " + loggedInUser.getId());
    }

    return reviewById;
  }

  private Review getReview(String reviewId) {

    return reviewRepository
        .findById(reviewId)
        .orElseThrow(() -> new RequestValidationException("No Review found with id :: " + reviewId));
  }

  private boolean isNotCampgroundReview(final Campground campgroundById, final String reviewId) {

    return campgroundById.getReviews().stream()
        .noneMatch(review -> review.getId().equals(reviewId));
  }

  @Override
  public void deleteReview(final String campgroundId, final String reviewId) {

    final Review reviewById = validateUserReviewAndGet(reviewId);

    final Campground campgroundById = campgroundService.getById(campgroundId);

    if (isNotCampgroundReview(campgroundById, reviewById.getId())) {

      throw new RequestValidationException(
          "Review does not being to campground :: " + campgroundId);
    }

   

   
    reviewRepository.delete(reviewById);

    final List<Review> updatedReviewList =
        campgroundById.getReviews().stream()
            .filter(review -> !review.getId().equals(reviewId))
            .collect(Collectors.toList());

    campgroundById.setReviews(updatedReviewList);

    campgroundService.save(campgroundById);
  }


  
}
