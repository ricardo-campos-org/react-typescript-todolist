package br.com.tasknoteapp.server.repository;

import br.com.tasknoteapp.server.entity.TaskUrlEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/** This interface represents a task url repository, for database access. */
public interface TaskUrlRepository extends JpaRepository<TaskUrlEntity, Long> {

  void deleteAllByIdIn(List<Long> ids);
}
