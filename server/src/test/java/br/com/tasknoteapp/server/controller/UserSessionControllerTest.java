package br.com.tasknoteapp.server.controller;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import br.com.tasknoteapp.server.service.AuthService;

@SpringBootTest
@AutoConfigureMockMvc
class UserSessionControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private AuthService authService;

  @Test
  @DisplayName("Refresh happy path should succeed")
  void refresh_happyPath_shouldSucceed() throws Exception {
    when(authService.signInUser(request)).thenReturn(null);

    String jsonString = """
        {
          "email": "user@domain.com",
          "password": "abcde123456"
        }
        """;

    mockMvc
        .perform(
            post("/auth/sign-in")
                .with(csrf().asHeader())
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON)
                .content(jsonString))
        .andExpect(status().isBadRequest())
        .andReturn();
  }
}
