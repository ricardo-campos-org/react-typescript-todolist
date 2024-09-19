package br.com.tasknoteapp.java_api.controller;

import br.com.tasknoteapp.java_api.exception.UserNotFoundException;
import br.com.tasknoteapp.java_api.response.JwtAuthenticationResponse;
import br.com.tasknoteapp.java_api.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** This class contains resources for handling user sessions. */
@RestController
@RequestMapping("/rest/user-sessions")
@AllArgsConstructor
@Tag(name = "User Sessions", description = "Resources to handle user sessions.")
public class UserSessionController {

  private final AuthService authService;

  /**
   * Refresh an existing user session, generating a new token.
   *
   * @return JwtAuthenticationResponse with token created.
   * @throws UserNotFoundException if user not found
   */
  @GetMapping(path = "/refresh")
  @Operation(
      summary = "Refresh an existing user session",
      description = "Refresh an existing user session, generating a new token",
      responses = {
        @ApiResponse(responseCode = "200", description = "Session successfully refreshed"),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden. Access Denied",
            content = @Content(schema = @Schema(implementation = Void.class))),
        @ApiResponse(
            responseCode = "404",
            description = "User not found",
            content = @Content(schema = @Schema(implementation = Void.class)))
      })
  public JwtAuthenticationResponse refresh() {
    String token = authService.refreshCurrentUserToken();
    return new JwtAuthenticationResponse(token);
  }
}