package br.com.tasknoteapp.server.repository;

import br.com.tasknoteapp.server.entity.TaskEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** This interface represents a task repository, for database access. */
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

  List<TaskEntity> findAllByUser_id(Long userId);

  @Query(
      """
      select distinct t
      from TaskEntity t
      left join TaskUrlEntity tu on tu.id.taskId = t.id
      where (
        upper(t.description) like upper(concat('%', :searchTerm, '%')) or
        upper(t.tag) like upper(concat('%', :searchTerm, '%')) or
        upper(tu.id.url) like upper(concat('%', :searchTerm, '%'))
        ) and t.user.id = :userId and t.done = false
      """)
  List<TaskEntity> findAllBySearchTerm(
      @Param("searchTerm") String searchTerm, @Param("userId") Long userId);
}
