package br.com.tasknoteapp.server.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import br.com.tasknoteapp.server.entity.UserEntity;
import br.com.tasknoteapp.server.exception.UserAlreadyExistsException;
import br.com.tasknoteapp.server.repository.UserPwdLimitRepository;
import br.com.tasknoteapp.server.repository.UserRepository;
import br.com.tasknoteapp.server.request.LoginRequest;
import br.com.tasknoteapp.server.util.AuthUtil;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class AuthServiceTest {

  @Mock private UserRepository userRepository;

  @Mock private PasswordEncoder passwordEncoder;

  @Mock private JwtService jwtService;

  @Mock private AuthenticationManager authenticationManager;

  @Mock private AuthUtil authUtil;

  @Mock private UserPwdLimitRepository userPwdLimitRepository;

  private AuthService authService;

  @BeforeEach
  void setup() {
    authService =
        new AuthService(
            userRepository,
            passwordEncoder,
            jwtService,
            authenticationManager,
            authUtil,
            userPwdLimitRepository);
  }

  @Test
  @DisplayName("SignUp new user happy path should succeed")
  void signUpNewUser_happyPath_shouldSucceed() {
    LoginRequest request = new LoginRequest("email@domain.com", "123456@abcde!");

    when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());
    when(authUtil.validatePassword(request.password())).thenReturn(Optional.empty());

    UserEntity entity = new UserEntity();
    entity.setId(3L);
    entity.setEmail(request.email());

    when(userRepository.save(any())).thenReturn(entity);
    when(jwtService.generateToken(request.email())).thenReturn("a1b2c3");

    String token = authService.signUpNewUser(request);

    Assertions.assertNotNull(token);
    Assertions.assertFalse(token.isBlank());
    Assertions.assertEquals("a1b2c3", token);
  }

  @Test
  @DisplayName("SignUp new user with existing email should fail")
  void signUpNewUser_emailExists_shouldFail() {
    LoginRequest request = new LoginRequest("email@domain.com", "123456@abcde!");

    UserEntity existing = new UserEntity();
    when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(existing));

    Assertions.assertThrows(UserAlreadyExistsException.class, () -> {
      authService.signUpNewUser(request);
    });
  }
}
