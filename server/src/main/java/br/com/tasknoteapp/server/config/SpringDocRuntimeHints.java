package br.com.tasknoteapp.server.config;

import org.springframework.aot.hint.MemberCategory;
import org.springframework.aot.hint.RuntimeHints;
import org.springframework.aot.hint.RuntimeHintsRegistrar;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

/** Runtime hints for SpringDoc OpenAPI to work with GraalVM native images. */
public class SpringDocRuntimeHints implements RuntimeHintsRegistrar {

  @Override
  public void registerHints(@NonNull RuntimeHints hints, @Nullable ClassLoader classLoader) {
    try {
      // Register SpringDoc core classes for reflection
      hints
          .reflection()
          .registerType(
              Class.forName("org.springdoc.core.properties.SpringDocConfigProperties"),
              MemberCategory.INVOKE_DECLARED_CONSTRUCTORS,
              MemberCategory.INVOKE_DECLARED_METHODS);

      hints
          .reflection()
          .registerType(
              Class.forName("org.springdoc.core.properties.SwaggerUiConfigProperties"),
              MemberCategory.INVOKE_DECLARED_CONSTRUCTORS,
              MemberCategory.INVOKE_DECLARED_METHODS);

      hints
          .reflection()
          .registerType(
              Class.forName("org.springdoc.core.models.GroupedOpenApi"),
              MemberCategory.INVOKE_DECLARED_CONSTRUCTORS,
              MemberCategory.INVOKE_DECLARED_METHODS);

      hints
          .reflection()
          .registerType(
              Class.forName("org.springdoc.webmvc.ui.SwaggerWelcomeWebMvc"),
              MemberCategory.INVOKE_DECLARED_CONSTRUCTORS,
              MemberCategory.INVOKE_DECLARED_METHODS);

      hints
          .reflection()
          .registerType(
              Class.forName("org.springdoc.webmvc.ui.SwaggerConfigResource"),
              MemberCategory.INVOKE_DECLARED_CONSTRUCTORS,
              MemberCategory.INVOKE_DECLARED_METHODS);

      hints
          .reflection()
          .registerType(
              Class.forName("org.springdoc.webmvc.ui.SwaggerIndexPageTransformer"),
              MemberCategory.INVOKE_DECLARED_CONSTRUCTORS,
              MemberCategory.INVOKE_DECLARED_METHODS);

      // Register resources for Swagger UI
      hints.resources().registerPattern("META-INF/resources/webjars/swagger-ui/*");
      hints.resources().registerPattern("META-INF/resources/webjars/swagger-ui/**/*");

    } catch (ClassNotFoundException e) {
      // Classes not found - likely not using SpringDoc, skip registration
    }
  }
}
