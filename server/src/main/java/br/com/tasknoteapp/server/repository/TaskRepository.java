package br.com.tasknoteapp.server.repository;

import br.com.tasknoteapp.server.entity.TaskEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/** This interface represents a task repository, for database access. */
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

  List<TaskEntity> findAllByUser_id(Long userId);

  @Query(
      "select t from TaskEntity t where upper(t.description) like upper(%?1%) and t.user.id = ?2")
  List<TaskEntity> findAllBySearchTerm(String searchTerm, Long userId);
}
