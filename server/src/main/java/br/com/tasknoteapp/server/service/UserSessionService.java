package br.com.tasknoteapp.server.service;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
public class UserSessionService {
    
  @Transactional
  public void deleteCurrentUserAccount() {
    //
  }
}
