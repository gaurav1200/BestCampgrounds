package com.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Review;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {}
