package com.app.exception;

import org.springframework.http.HttpStatus;

@SuppressWarnings("serial")
public class RequestValidationException extends BestCampException {

  public RequestValidationException() {

    super();
  }

  public RequestValidationException(String message) {

    super(message);
  }

  public RequestValidationException(String message, Throwable cause) {

    super(message, cause);
  }

  public RequestValidationException(Throwable cause) {

    super(cause);
  }

  protected RequestValidationException(
      String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {

    super(message, cause, enableSuppression, writableStackTrace);
  }

  @Override
  public String getErrorMessage() {

    return "Request Validation Failed";
  }

  @Override
  public HttpStatus getHttpStatus() {

    return HttpStatus.BAD_REQUEST;
  }
}
