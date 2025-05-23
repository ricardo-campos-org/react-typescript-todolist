package br.com.tasknoteapp.server.controller;

import br.com.tasknoteapp.server.exception.EmailAlreadyExistsException;
import br.com.tasknoteapp.server.exception.InvalidCredentialsException;
import br.com.tasknoteapp.server.exception.UserNotFoundException;
import br.com.tasknoteapp.server.request.EmailConfirmationRequest;
import br.com.tasknoteapp.server.request.LoginRequest;
import br.com.tasknoteapp.server.request.PasswordResetRequest;
import br.com.tasknoteapp.server.request.ResendConfirmationRequest;
import br.com.tasknoteapp.server.response.UserResponseWithToken;
import br.com.tasknoteapp.server.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** This class contains the resources for handling authentication. */
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
   * @throws EmailAlreadyExistsException when the provide email is already in use.
   */
  @PutMapping(path = "/sign-up", consumes = "application/json", produces = "application/json")
  @Operation(
      summary = "Signup a new user",
      description = "Signup a new user given his email and password",
      responses = {
        @ApiResponse(responseCode = "204", description = "User successfully created and saved"),
        @ApiResponse(
            responseCode = "400",
            description = "Wrong or missing information",
            content = @Content(schema = @Schema(implementation = Void.class))),
        @ApiResponse(
            responseCode = "409",
            description = "Email already in use",
            content = @Content(schema = @Schema(implementation = Void.class)))
      })
  public ResponseEntity<Void> signUp(@RequestBody @Valid LoginRequest loginRequest) {
    authService.signUpNewUser(loginRequest);
    return ResponseEntity.noContent().build();
  }

  /**
   * Authenticate a user given his email and password.
   *
   * @param loginRequest User data containing email and password.
   * @return JwtAuthenticationResponse with token created.
   * @throws UserNotFoundException if user not or InvalidCredentialsException if credentials are
   *     invalid.
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
            responseCode = "404",
            description = "User not found",
            content = @Content(schema = @Schema(implementation = Void.class)))
      })
  public ResponseEntity<UserResponseWithToken> signIn(
      @RequestBody @Valid LoginRequest loginRequest) {
    UserResponseWithToken response = authService.signInUser(loginRequest);
    if (Objects.isNull(response)) {
      throw new InvalidCredentialsException();
    }
    return ResponseEntity.ok().body(response);
  }

  /**
   * Send a confirmation email to the user.
   *
   * @param confirmation The request containing the user uuid.
   * @return No content 204 http code.
   */
  @PostMapping(path = "/email-confirmation", consumes = "application/json")
  @Operation(
      summary = "Send a confirmation email to the user",
      description = "After the registration sends the user a confirmation email",
      responses = {
        @ApiResponse(responseCode = "204", description = "User successfully logged in"),
        @ApiResponse(
            responseCode = "400",
            description = "Wrong or missing information",
            content = @Content(schema = @Schema(implementation = Void.class))),
      })
  public ResponseEntity<Void> confirmEmailAddress(
      @RequestBody @Valid EmailConfirmationRequest confirmation) {
    authService.confirmUserAccount(confirmation.identification());
    return ResponseEntity.noContent().build();
  }

  /**
   * Re-Send a confirmation email to the user.
   *
   * @param request The request containing user's email.
   * @return No content 204 http code.
   */
  @PostMapping(path = "/resend-email-confirmation", consumes = "application/json")
  @Operation(
      summary = "Re-Send a confirmation email to the user",
      description = "Allow users to resend the confirmation email",
      responses = {
        @ApiResponse(responseCode = "204", description = "User email confirmation resent"),
        @ApiResponse(
            responseCode = "400",
            description = "Wrong or missing information",
            content = @Content(schema = @Schema(implementation = Void.class))),
      })
  public ResponseEntity<Void> resendEmailConfirmation(
      @RequestBody @Valid ResendConfirmationRequest request) {
    authService.resendEmailConfirmation(request.email());
    return ResponseEntity.noContent().build();
  }

  /**
   * Request a user's password reset.
   *
   * @param request The request containing user's email.
   * @return No content 204 http code.
   */
  @PostMapping(path = "/password-reset", consumes = "application/json")
  @Operation(
      summary = "Request a user's password reset",
      description = "Request the user password reset if there's a user",
      responses = {
        @ApiResponse(responseCode = "204", description = "User password requested"),
        @ApiResponse(
            responseCode = "400",
            description = "Wrong or missing information",
            content = @Content(schema = @Schema(implementation = Void.class))),
      })
  public ResponseEntity<Void> passwordReset(@RequestBody @Valid ResendConfirmationRequest request) {
    authService.resetPasswordForUser(request.email());
    return ResponseEntity.noContent().build();
  }

  /**
   * Confirm the user password change request.
   *
   * @param request The request containing the token and the new password.
   * @return No content 204 http code.
   */
  @PostMapping(path = "/complete-password-reset", consumes = "application/json")
  @Operation(
      summary = "Confirm the password reset",
      description = "Confirm and set the new password for the user",
      responses = {
        @ApiResponse(responseCode = "204", description = "User password reset completed"),
        @ApiResponse(
            responseCode = "400",
            description = "Wrong or missing information",
            content = @Content(schema = @Schema(implementation = Void.class))),
      })
  public ResponseEntity<Void> completePasswordReset(
      @RequestBody @Valid PasswordResetRequest request) {
    authService.confirmResetPasswordForUser(request);
    return ResponseEntity.noContent().build();
  }
}
