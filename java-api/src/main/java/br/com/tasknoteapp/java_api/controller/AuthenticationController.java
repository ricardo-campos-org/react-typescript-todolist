package br.com.tasknoteapp.java_api.controller;

import br.com.tasknoteapp.java_api.exception.UserAlreadyExistsException;
import br.com.tasknoteapp.java_api.exception.UserNotFoundException;
import br.com.tasknoteapp.java_api.request.LoginRequest;
import br.com.tasknoteapp.java_api.response.JwtAuthenticationResponse;
import br.com.tasknoteapp.java_api.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** This class contains resources for handling authentication. */
@RestController
@RequestMapping("/auth")
@Tag(
    name = "Authentication",
    description = "Authentication resources to handle user authentication.")
@AllArgsConstructor
public class AuthenticationController {

  private final AuthService authService;

  /**
   * Signup a new user.
   *
   * @param loginRequest User data with email and password.
   * @return JwtAuthenticationResponse containing user token
   * @throws UserAlreadyExistsException
   */
  @PutMapping(path = "/sign-up", consumes = "application/json", produces = "application/json")
  @Operation(
      summary = "Signup a new user",
      description = "Signup a new user given his email and password",
      responses = {
        @ApiResponse(responseCode = "201", description = "User successfully created and saved"),
        @ApiResponse(
            responseCode = "400",
            description = "Wrong or missing information",
            content = @Content(schema = @Schema(implementation = Void.class))),
        @ApiResponse(
            responseCode = "409",
            description = "User already exists",
            content = @Content(schema = @Schema(implementation = Void.class)))
      })
  public ResponseEntity<JwtAuthenticationResponse> signUp(
      @RequestBody @Valid LoginRequest loginRequest) {
    String token = authService.signUpNewUser(loginRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(new JwtAuthenticationResponse(token));
  }

  /**
   * Authenticate a user given his email and password.
   *
   * @param loginRequest User data containing email and password.
   * @return JwtAuthenticationResponse with token created.
   * @throws UserNotFoundException if user not found
   */
  @PostMapping(path = "/sign-in", consumes = "application/json", produces = "application/json")
  @Operation(
      summary = "SigIn an existing user",
      description = "SigIn an existing user given his email and password",
      responses = {
        @ApiResponse(responseCode = "200", description = "User successfully logged in"),
        @ApiResponse(
            responseCode = "400",
            description = "Wrong or missing information",
            content = @Content(schema = @Schema(implementation = Void.class))),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden. Access Denied",
            content = @Content(schema = @Schema(implementation = Void.class))),
        @ApiResponse(
            responseCode = "404",
            description = "User not found",
            content = @Content(schema = @Schema(implementation = Void.class)))
      })
  public JwtAuthenticationResponse signIn(@RequestBody @Valid LoginRequest loginRequest) {
    String token = authService.signInUser(loginRequest);
    return new JwtAuthenticationResponse(token);
  }
}
