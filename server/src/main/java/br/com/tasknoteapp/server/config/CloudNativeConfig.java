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
  io.jsonwebtoken.Claims.class,
  io.jsonwebtoken.Jwts.class,
  io.jsonwebtoken.Jwts.SIG.class,
  io.jsonwebtoken.Jwts.ENC.class,
  io.jsonwebtoken.Jwts.KEY.class,
  io.jsonwebtoken.impl.security.KeysBridge.class,
  io.jsonwebtoken.impl.security.StandardSecureDigestAlgorithms.class,
  io.jsonwebtoken.impl.security.StandardKeyOperations.class,
  io.jsonwebtoken.impl.security.StandardEncryptionAlgorithms.class,
  io.jsonwebtoken.impl.security.StandardKeyAlgorithms.class,
  io.jsonwebtoken.impl.io.StandardCompressionAlgorithms.class,
  io.jsonwebtoken.impl.DefaultClaimsBuilder.class,
  io.jsonwebtoken.impl.DefaultJwtParserBuilder.class,
  org.flywaydb.core.internal.publishing.PublishingConfigurationExtension.class,
})
@ImportRuntimeHints(value = {HttpServletRequestRuntimeHint.class})
public class CloudNativeConfig {}
