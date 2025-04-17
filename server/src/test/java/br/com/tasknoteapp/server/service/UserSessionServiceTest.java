package br.com.tasknoteapp.server.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.anyList;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import br.com.tasknoteapp.server.entity.NotesCreatedEntity;
import br.com.tasknoteapp.server.entity.UserEntity;
import br.com.tasknoteapp.server.entity.UserTasksDone;
import br.com.tasknoteapp.server.exception.UserNotFoundException;
import br.com.tasknoteapp.server.repository.NotesCreatedRepository;
import br.com.tasknoteapp.server.repository.UserTasksDoneRepository;
import br.com.tasknoteapp.server.response.NoteResponse;
import br.com.tasknoteapp.server.response.TaskResponse;
import br.com.tasknoteapp.server.response.UserResponse;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class UserSessionServiceTest {

  // Test class generated by GitHub Copilot

  @Mock private AuthService authService;
  @Mock private TaskService taskService;
  @Mock private NoteService noteService;
  @Mock private UserTasksDoneRepository userTasksDoneRepository;
  @Mock private NotesCreatedRepository notesCreatedRepository;

  private UserSessionService userSessionService;

  @BeforeEach
  void setUp() {
    userSessionService =
        new UserSessionService(
            authService, taskService, noteService, userTasksDoneRepository, notesCreatedRepository);
  }

  @Test
  void deleteCurrentUserAccount_happyPath_shouldSucceed() {
    // Arrange
    UserEntity user = new UserEntity();
    user.setId(1L);
    user.setEmail("user@domain.com");

    TaskResponse task =
        new TaskResponse(1L, "Task 1", false, true, null, null, null, null, List.of());
    NoteResponse note = new NoteResponse(1L, "Note 1", "Description", null, null);

    when(authService.getCurrentUser()).thenReturn(Optional.of(user));
    when(taskService.getAllTasks()).thenReturn(List.of(task));
    when(noteService.getAllNotes()).thenReturn(List.of(note));
    when(userTasksDoneRepository.findAllById_userId(1L)).thenReturn(List.of(new UserTasksDone()));
    when(notesCreatedRepository.findAllByUserId(1L)).thenReturn(List.of(new NotesCreatedEntity()));
    when(authService.deleteUserAccount())
        .thenReturn(
            new UserResponse(user.getId(), "user", user.getEmail(), false, null, null, null));

    // Act
    UserResponse response = userSessionService.deleteCurrentUserAccount();

    // Assert
    assert response.userId() == 1L;
    assert response.email().equals("user@domain.com");
    verify(taskService).deleteTask(task.id());
    verify(noteService).deleteNote(note.id());
    verify(userTasksDoneRepository).deleteAllInBatch(anyList());
    verify(notesCreatedRepository).deleteAll(anyList());
    verify(authService).deleteUserAccount();
  }

  @Test
  void deleteCurrentUserAccount_userNotFound_shouldThrowException() {
    // Arrange
    when(authService.getCurrentUser()).thenReturn(Optional.empty());

    // Act & Assert
    assertThrows(UserNotFoundException.class, () -> userSessionService.deleteCurrentUserAccount());
    verifyNoInteractions(taskService, noteService, userTasksDoneRepository, notesCreatedRepository);
  }
}
