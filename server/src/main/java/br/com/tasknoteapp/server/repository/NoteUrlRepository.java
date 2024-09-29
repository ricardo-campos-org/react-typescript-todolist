package br.com.tasknoteapp.server.repository;

import br.com.tasknoteapp.server.entity.NoteUrlEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteUrlRepository extends JpaRepository<NoteUrlEntity, Long> {

  void deleteAllByIdIn(List<Long> ids);
}