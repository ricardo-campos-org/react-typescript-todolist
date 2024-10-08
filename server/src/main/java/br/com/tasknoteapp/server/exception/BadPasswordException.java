package br.com.tasknoteapp.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

/** This class represents a Bad Password exception. */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadPasswordException extends ResponseStatusException {

  public BadPasswordException(String message) {
    super(HttpStatus.BAD_REQUEST, String.format("Bad password: %s", message));
  }
}
