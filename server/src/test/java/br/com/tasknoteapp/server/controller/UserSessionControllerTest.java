package br.com.tasknoteapp.server.controller;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.com.tasknoteapp.server.response.JwtAuthenticationResponse;
import br.com.tasknoteapp.server.service.UserSessionService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class UserSessionControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private UserSessionService userSessionService;

  @Test
  @DisplayName("Refresh happy path should succeed")
  @WithMockUser(username = "user@domain.com", password = "abcde123456A@")
  void refresh_happyPath_shouldSucceed() throws Exception {
    JwtAuthenticationResponse authResponse = new JwtAuthenticationResponse("axbxdxdc123456");
    when(userSessionService.refreshUserSession()).thenReturn(authResponse);

    mockMvc
        .perform(
            get("/rest/user-sessions/refresh")
                .with(csrf().asHeader())
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value(authResponse.token()))
        .andReturn();
  }
}
