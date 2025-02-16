package br.com.tasknoteapp.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Sql(scripts = {"classpath:sql/TaskUrlRepositoryTest.sql"})
@Transactional(propagation = Propagation.NOT_SUPPORTED)
class TaskUrlRepositoryIntTest {
  
  @Autowired TaskUrlRepository taskUrlRepository;

  void deleteAllById_taskIdIntTest() {
    // finish here
  }

  void findAllById_taskIdIntTest() {
    // finish here
  }
}
