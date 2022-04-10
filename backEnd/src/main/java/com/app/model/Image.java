package com.app.model;

import javax.validation.constraints.NotEmpty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Document("images")
@NoArgsConstructor
public class Image {
	@Id
private String id;
	@NotEmpty
private String url;
	@NotEmpty
private String filename;
}
