package br.com.tasknoteapp.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;

/** This class contains a single component config with image tag version. */
@Component
public class ApiBuildInfoConfig implements HealthIndicator {

  @Value("${br.com.tasknote.server.version}")
  private String apiBuildInfo;

  @Override
  public Health health() {
    return Health.up().withDetail("buildInfo", apiBuildInfo).build();
  }
}
