package com.app.services;


import java.util.List;

import com.app.model.Image;


public interface IImageService {
  Image addImage(final String campId,final Image img);
  List<Image> getAllImages(final String campId);
  void deleteImage(final String campId, final String name);
 
}
