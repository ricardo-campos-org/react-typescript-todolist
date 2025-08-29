package br.com.tasknoteapp.server.config;

import br.com.tasknoteapp.server.request.LoginRequest;
import br.com.tasknoteapp.server.request.NotePatchRequest;
import br.com.tasknoteapp.server.request.NoteRequest;
import br.com.tasknoteapp.server.request.NoteUrlPatchRequest;
import br.com.tasknoteapp.server.request.TaskPatchRequest;
import br.com.tasknoteapp.server.request.TaskRequest;
import br.com.tasknoteapp.server.request.TaskUrlPatchRequest;
import br.com.tasknoteapp.server.response.JwtAuthenticationResponse;
import br.com.tasknoteapp.server.response.NoteResponse;
import br.com.tasknoteapp.server.response.NoteUrlResponse;
import br.com.tasknoteapp.server.response.TaskResponse;
import br.com.tasknoteapp.server.response.UserResponse;
import org.springframework.aot.hint.annotation.RegisterReflectionForBinding;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportRuntimeHints;

/** This class contains configurations for the GraalVM Cloud Native image. */
@Configuration
@RegisterReflectionForBinding({
  LoginRequest.class,
  NotePatchRequest.class,
  NoteRequest.class,
  NoteUrlPatchRequest.class,
  TaskPatchRequest.class,
  TaskRequest.class,
  TaskUrlPatchRequest.class,
  JwtAuthenticationResponse.class,
  NoteResponse.class,
  NoteUrlResponse.class,
  TaskResponse.class,
  UserResponse.class,
  org.flywaydb.core.internal.publishing.PublishingConfigurationExtension.class,
})
@ImportRuntimeHints(value = {HttpServletRequestRuntimeHint.class})
public class CloudNativeConfig {}
