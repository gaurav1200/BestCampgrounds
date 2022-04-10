package com.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("reviews")
@NoArgsConstructor
public class Review {

  @Id private String id;

  private String body;
  private int rating;

  @DBRef private User author;

@Override
public String toString() {
	return "Review [id=" + id + ", body=" + body + ", rating=" + rating + ", author=" + author + "]";
}

  
}
