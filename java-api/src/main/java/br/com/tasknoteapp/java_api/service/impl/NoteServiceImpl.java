package br.com.tasknoteapp.java_api.service.impl;

import br.com.tasknoteapp.java_api.entity.NoteEntity;
import br.com.tasknoteapp.java_api.entity.NoteUrlEntity;
import br.com.tasknoteapp.java_api.entity.UserEntity;
import br.com.tasknoteapp.java_api.exception.NoteNotFoundException;
import br.com.tasknoteapp.java_api.repository.NoteRepository;
import br.com.tasknoteapp.java_api.repository.NoteUrlRepository;
import br.com.tasknoteapp.java_api.request.NotePatchRequest;
import br.com.tasknoteapp.java_api.request.NoteRequest;
import br.com.tasknoteapp.java_api.request.NoteUrlPatchRequest;
import br.com.tasknoteapp.java_api.response.NoteResponse;
import br.com.tasknoteapp.java_api.service.AuthService;
import br.com.tasknoteapp.java_api.service.NoteService;
import br.com.tasknoteapp.java_api.util.AuthUtil;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class NoteServiceImpl implements NoteService {

  private final NoteRepository noteRepository;

  private final AuthService authService;

  private final AuthUtil authUtil;

  private final NoteUrlRepository noteUrlRepository;

  @Override
  public List<NoteResponse> getAllNotes() {
    UserEntity user = getCurrentUser();

    log.info("Get all notes to user {}", user.getId());

    List<NoteEntity> notes = noteRepository.findAllByUser_id(user.getId());
    log.info("{} notes found!", notes.size());

    return notes.stream().map(NoteResponse::fromEntity).toList();
  }

  @Override
  public NoteEntity createNote(NoteRequest noteRequest) {
    UserEntity user = getCurrentUser();

    log.info("Creating note to user {}", user.getId());

    NoteEntity note = new NoteEntity();
    note.setTitle(noteRequest.title());
    note.setDescription(noteRequest.description());
    note.setUser(user);
    NoteEntity created = noteRepository.save(note);

    if (!Objects.isNull(noteRequest.urls()) && !noteRequest.urls().isEmpty()) {
      List<NoteUrlEntity> urls = saveUrls(note, noteRequest.urls());
      note.setUrls(urls);
    }

    log.info("Note created! Id {}", created.getId());
    return created;
  }

  @Override
  @Transactional
  public NoteResponse patchNote(Long noteId, NotePatchRequest patch) {
    UserEntity user = getCurrentUser();

    log.info("Patching task {} to user {}", noteId, user.getId());

    Optional<NoteEntity> note = noteRepository.findById(noteId);
    if (note.isEmpty()) {
      throw new NoteNotFoundException();
    }

    NoteEntity noteEntity = note.get();
    if (!Objects.isNull(patch.title()) && !patch.title().isBlank()) {
      noteEntity.setTitle(patch.title());
    }
    if (!Objects.isNull(patch.description()) && !patch.description().isBlank()) {
      noteEntity.setDescription(patch.description());
    }

    if (!Objects.isNull(patch.urls())) {
      List<Long> urlIds =
          patch.urls().stream().filter(p -> p.id() != null).map(NoteUrlPatchRequest::id).toList();
      if (!urlIds.isEmpty()) {
        noteUrlRepository.deleteAllByIdIn(urlIds);
        log.info("Deleted {} urls from task {}", urlIds.size(), noteId);
      } else {
        log.info("No urls to patch for task {}", noteId);
      }

      List<String> urlsList =
          patch.urls().stream().filter(p -> p.id() == null).map(NoteUrlPatchRequest::url).toList();
      List<NoteUrlEntity> urls = saveUrls(noteEntity, urlsList);

      noteEntity.setUrls(urls);
    }

    NoteEntity patchedNote = noteRepository.save(noteEntity);

    log.info("Note patched! Id {}", patchedNote.getId());

    return NoteResponse.fromEntity(patchedNote);
  }

  @Override
  @Transactional
  public void deleteNote(Long noteId) {
    UserEntity user = getCurrentUser();

    log.info("Deleting note {} to user {}", noteId, user.getId());

    Optional<NoteEntity> note = noteRepository.findById(noteId);
    if (note.isEmpty()) {
      throw new NoteNotFoundException();
    }

    List<NoteUrlEntity> urls = note.get().getUrls();
    if (!urls.isEmpty()) {
      noteUrlRepository.deleteAll(urls);
      log.info("Deleted {} urls from task {}", urls.size(), noteId);
    } else {
      log.info("No urls to delete for task {}", noteId);
    }

    noteRepository.delete(note.get());

    log.info("Note deleted! Id {}", noteId);
  }

  @Override
  public List<NoteResponse> searchNotes(String searchTerm) {
    UserEntity user = getCurrentUser();

    log.info("Searching notes to user {}", user.getId());

    List<NoteEntity> notes =
        noteRepository.findAllBySearchTerm(searchTerm.toUpperCase(), user.getId());
    log.info("{} tasks found!", notes.size());

    return notes.stream().map(NoteResponse::fromEntity).toList();
  }

  private UserEntity getCurrentUser() {
    Optional<String> currentUserEmail = authUtil.getCurrentUserEmail();
    String email = currentUserEmail.orElseThrow();
    return authService.findByEmail(email).orElseThrow();
  }

  private List<NoteUrlEntity> saveUrls(NoteEntity noteEntity, List<String> urls) {
    List<NoteUrlEntity> tasksUrl = new ArrayList<>();
    for (String url : urls) {
      NoteUrlEntity taskUrl = new NoteUrlEntity();
      taskUrl.setUrl(url);
      taskUrl.setNote(noteEntity);
      tasksUrl.add(taskUrl);
    }

    List<NoteUrlEntity> savedUrls = noteUrlRepository.saveAll(tasksUrl);
    log.info("Saved {} urls to note {}", savedUrls.size(), noteEntity.getId());

    return savedUrls;
  }
}