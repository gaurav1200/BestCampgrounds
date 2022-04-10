package com.app.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@SuppressWarnings("serial")
@Getter
public class BestCampException extends RuntimeException implements EnrichedException {

  public BestCampException() {

    super();
  }

  public BestCampException(String message) {

    super(message);
  }

  public BestCampException(String message, Throwable cause) {

    super(message, cause);
  }

  public BestCampException(Throwable cause) {

    super(cause);
  }

  protected BestCampException(
      String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {

    super(message, cause, enableSuppression, writableStackTrace);
  }

  @Override
  public String getErrorMessage() {

    return "Best Campground Exception";
  }

  @Override
  public HttpStatus getHttpStatus() {

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
