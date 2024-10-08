package br.com.tasknoteapp.server.service;

import br.com.tasknoteapp.server.entity.UserEntity;
import br.com.tasknoteapp.server.request.LoginRequest;
import br.com.tasknoteapp.server.response.UserResponse;
import java.util.List;
import java.util.Optional;
import org.springframework.security.core.userdetails.User;

/** This interface contains methods for handling user Authentication. */
public interface AuthService {

  /**
   * Create a new user in the app.
   *
   * @param login User details with email and password.
   * @return Token
   */
  public String signUpNewUser(LoginRequest login);

  /**
   * Find a user by email in the database.
   *
   * @param email The user email.
   * @return Optional of a UserEntity instance.
   */
  public Optional<UserEntity> findByEmail(String email);

  /**
   * Load a user from the database given his email.
   *
   * @param email The user email.
   * @return User with found record.
   */
  public User loadUserByUsername(String email);

  /**
   * SignIn a user given his email and password.
   *
   * @param login User details with email and password.
   * @return Token
   */
  public String signInUser(LoginRequest login);

  /**
   * Get all registered users.
   *
   * @return List of UserEntity.
   */
  public List<UserResponse> getAllUsers();

  /**
   * Refresh the current user token.
   *
   * @return Token
   */
  public String refreshCurrentUserToken();
}
