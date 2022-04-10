package com.app.exception;

import org.springframework.http.HttpStatus;

@SuppressWarnings("serial")
public class NotAllowedException extends BestCampException {

  public NotAllowedException() {

    super();
  }

  public NotAllowedException(String message) {

    super(message);
  }

  public NotAllowedException(String message, Throwable cause) {

    super(message, cause);
  }

  public NotAllowedException(Throwable cause) {

    super(cause);
  }

  protected NotAllowedException(
      String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {

    super(message, cause, enableSuppression, writableStackTrace);
  }

  @Override
  public String getErrorMessage() {

    return "Forbidden";
  }

  @Override
  public HttpStatus getHttpStatus() {

    return HttpStatus.FORBIDDEN;
  }
}
