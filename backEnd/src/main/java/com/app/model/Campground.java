package com.app.model;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Document("campgrounds")
@NoArgsConstructor
public class Campground {

	@Id
private String id;
	@NotEmpty
private String title;
	@NotEmpty
private String city;
	@NotEmpty
private String state;
	@NotEmpty
private String country;
	@NotNull
private Double price;
	@NotEmpty
private String description;
private String author;
@DBRef private List<Image> images=new ArrayList<>();
@DBRef private List<Review> reviews = new ArrayList<>();

@Override
public String toString() {
	return "Campground [id=" + id + ", title=" + title + ", city=" + city + ", state=" + state + ", country="
			+ country + ", price=" + price + ", description=" + description + ", author=" + author + ", imeges="
			+ images + "]";
}
}
