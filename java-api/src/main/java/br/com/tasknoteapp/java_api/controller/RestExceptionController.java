package br.com.tasknoteapp.java_api.controller;

import br.com.tasknoteapp.java_api.response.ValidationExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionController {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ValidationExceptionResponse> handleValidationException(
      MethodArgumentNotValidException ex) {
    return ResponseEntity.badRequest().body(new ValidationExceptionResponse(ex.getFieldErrors()));
  }
}
