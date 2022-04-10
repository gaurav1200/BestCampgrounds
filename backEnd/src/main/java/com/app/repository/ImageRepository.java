package com.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Image;

@Repository
public interface ImageRepository extends MongoRepository<Image, String> {
	Image findByFilename(String name);
	}
