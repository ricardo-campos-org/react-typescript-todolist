package br.com.tasknoteapp.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/** This class represents a User in the database. */
@Data
@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private Boolean admin;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "inactivated_at", nullable = true)
  private LocalDateTime inactivatedAt;

  @Column(name = "name", length = 20)
  private String name;

  @OneToMany(mappedBy = "user")
  private List<TaskEntity> tasks;

  @Column(name = "email_confirmed_at", nullable = true)
  private LocalDateTime emailConfirmedAt;

  @Column(name = "email_uuid", columnDefinition = "uuid", nullable = true, unique = true)
  private UUID emailUuid;

  @Column(name = "reset_password_expiration", nullable = true)
  private LocalDateTime resetPasswordExpiration;

  @Column(name = "reset_token", nullable = true, length = 35)
  private String resetToken;

  @Column(name = "lang", nullable = true, length = 6)
  private String lang;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getUsername() {
    // email in our case
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
