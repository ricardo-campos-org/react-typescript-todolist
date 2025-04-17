package br.com.tasknoteapp.server.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import br.com.tasknoteapp.server.entity.TaskEntity;
import br.com.tasknoteapp.server.entity.TaskUrlEntity;
import br.com.tasknoteapp.server.entity.TaskUrlEntityPk;
import br.com.tasknoteapp.server.entity.UserEntity;
import br.com.tasknoteapp.server.entity.UserTasksDonePk;
import br.com.tasknoteapp.server.exception.TaskNotFoundException;
import br.com.tasknoteapp.server.repository.TaskRepository;
import br.com.tasknoteapp.server.repository.TaskUrlRepository;
import br.com.tasknoteapp.server.repository.UserTasksDoneRepository;
import br.com.tasknoteapp.server.request.TaskPatchRequest;
import br.com.tasknoteapp.server.request.TaskRequest;
import br.com.tasknoteapp.server.response.TaskResponse;
import br.com.tasknoteapp.server.util.AuthUtil;
import br.com.tasknoteapp.server.util.TimeAgoUtil;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class TaskServiceTest {

  @Mock TaskRepository taskRepository;

  @Mock AuthService authService;

  @Mock AuthUtil authUtil;

  @Mock TaskUrlRepository taskUrlRepository;

  @Mock UserTasksDoneRepository userTasksDoneRepository;

  private static final Long USER_ID = 123L;

  private static final String USER_EMAIL = "test@domain.com";

  private TaskService taskService;

  @BeforeEach
  void setup() {
    taskService =
        new TaskService(
            taskRepository, authService, authUtil, taskUrlRepository, userTasksDoneRepository);
  }

  @Test
  @DisplayName("Get tasks by id happy path should succeed")
  void getTaskById_happyPath_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 9976L;

    TaskEntity taskEntity = new TaskEntity();
    taskEntity.setId(taskId);
    taskEntity.setDescription("Test task");
    taskEntity.setHighPriority(true);
    taskEntity.setTag("test");
    taskEntity.setUser(userEntity);
    when(taskRepository.findById(taskId)).thenReturn(Optional.of(taskEntity));

    TaskResponse taskResponse = taskService.getTaskById(taskId);

    assertNotNull(taskResponse);
    assertEquals(taskEntity.getId(), taskResponse.id());
    assertEquals(taskEntity.getDescription(), taskResponse.description());
    assertEquals(taskEntity.getHighPriority(), taskResponse.highPriority());
    assertEquals(taskEntity.getTag(), taskResponse.tag());
  }

  @Test
  @DisplayName("Get tasks by id not found should fail")
  void getTaskById_notFound_shouldFail() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 9976L;

    when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

    assertThrows(TaskNotFoundException.class, () -> taskService.getTaskById(taskId));
  }

  @Test
  @DisplayName("Create a task null dueDate should succeed")
  void createTask_nullDueDate_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    TaskRequest request = new TaskRequest("Write unit tests", null, null, false, "development");

    TaskEntity entity = new TaskEntity();
    entity.setDescription(request.description());
    entity.setHighPriority(request.highPriority());
    entity.setTag(request.tag());
    when(taskRepository.save(any())).thenReturn(new TaskEntity());

    taskService.createTask(request);

    assertNotNull(entity);
    assertEquals("development", entity.getTag());
  }

  @Test
  @DisplayName("Create a task blank dueDate should succeed")
  void createTask_blankDueDate_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    TaskRequest request = new TaskRequest("Write unit tests", null, "", false, "development");

    TaskEntity entity = new TaskEntity();
    entity.setDescription(request.description());
    entity.setHighPriority(request.highPriority());
    entity.setTag(request.tag());
    when(taskRepository.save(any())).thenReturn(new TaskEntity());

    taskService.createTask(request);

    assertNotNull(entity);
    assertEquals("development", entity.getTag());
  }

  @Test
  @DisplayName("Create a task full dueDate should succeed")
  void createTask_fullDueDate_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    TaskRequest request =
        new TaskRequest("Write unit tests", null, "2025-12-12", false, "development");

    TaskEntity entity = new TaskEntity();
    entity.setDescription(request.description());
    entity.setHighPriority(request.highPriority());
    entity.setTag(request.tag());
    when(taskRepository.save(any())).thenReturn(new TaskEntity());

    taskService.createTask(request);

    assertNotNull(entity);
    assertEquals("development", entity.getTag());
  }

  @Test
  @DisplayName("Create task with null url it should succeed")
  void createTask_nullUrl_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    TaskRequest request =
        new TaskRequest("Write unit tests", null, "2025-12-12", false, "development");

    TaskEntity entity = new TaskEntity();
    entity.setId(123L);
    entity.setDescription(request.description());
    entity.setHighPriority(request.highPriority());
    entity.setTag(request.tag());
    when(taskRepository.save(any())).thenReturn(new TaskEntity());

    TaskResponse response = taskService.createTask(request);

    assertNotNull(response);
    assertTrue(response.urls().isEmpty());
  }

  @Test
  @DisplayName("Create task with empty url it should succeed")
  void createTask_emptyUrl_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    TaskRequest request =
        new TaskRequest("Write unit tests", List.of(), "2025-12-12", false, "development");

    TaskEntity entity = new TaskEntity();
    entity.setId(123L);
    entity.setDescription(request.description());
    entity.setHighPriority(request.highPriority());
    entity.setTag(request.tag());
    when(taskRepository.save(any())).thenReturn(new TaskEntity());

    TaskResponse response = taskService.createTask(request);

    assertNotNull(response);
    assertTrue(response.urls().isEmpty());
  }

  @Test
  @DisplayName("Create task with valid url it should succeed")
  void createTask_fullUrl_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    TaskRequest request =
        new TaskRequest(
            "Write unit tests", List.of("debian.org"), "2025-12-12", false, "development");

    TaskEntity entity = new TaskEntity();
    entity.setId(123L);
    entity.setDescription(request.description());
    entity.setHighPriority(request.highPriority());
    entity.setTag(request.tag());
    when(taskRepository.save(any())).thenReturn(entity);

    TaskUrlEntity urlEntity = new TaskUrlEntity();
    urlEntity.setId(new TaskUrlEntityPk(entity.getId(), "debian.org"));
    when(taskUrlRepository.findAllById_taskId(entity.getId())).thenReturn(List.of(urlEntity));

    TaskResponse response = taskService.createTask(request);

    assertNotNull(response);
    assertFalse(response.urls().isEmpty());
    assertEquals("debian.org", response.urls().get(0));
  }

  @Test
  @DisplayName("Get all tasks happy path should succeed")
  void getAllTasks_happyPath_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    TaskEntity entity = new TaskEntity();
    entity.setDescription("Writ unit tests");
    entity.setHighPriority(true);
    entity.setTag("dev");
    when(taskRepository.findAllByUser_id(USER_ID)).thenReturn(List.of(entity));

    List<TaskResponse> responses = taskService.getAllTasks();

    assertFalse(responses.isEmpty());
    assertEquals(1, responses.size());
    assertEquals(entity.getTag(), responses.get(0).tag());
  }

  @Test
  @DisplayName("Delete a task following the happy path should succeed")
  void deleteTask_happyPath_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 2525L;

    TaskEntity taskEntity = new TaskEntity();
    taskEntity.setId(taskId);
    taskEntity.setDescription("Test task");
    taskEntity.setHighPriority(true);
    taskEntity.setTag("test");
    taskEntity.setUser(userEntity);
    when(taskRepository.findById(taskId)).thenReturn(Optional.of(taskEntity));

    when(taskUrlRepository.findAllById_taskId(taskId)).thenReturn(List.of());

    doNothing().when(taskRepository).delete(taskEntity);

    taskService.deleteTask(taskId);

    verify(taskRepository, times(1)).delete(any());
  }

  @Test
  @DisplayName("Delete a not existing tasks it should fail")
  void deleteTask_notFound_shouldFail() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 2526L;

    when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

    assertThrows(TaskNotFoundException.class, () -> taskService.deleteTask(taskId));
  }

  @Test
  @DisplayName("Patch a task following the happy path it should succeed")
  void patchTask_happyPath_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 2525L;

    TaskEntity taskEntity = new TaskEntity();
    taskEntity.setId(taskId);
    taskEntity.setDescription("Test task");
    taskEntity.setHighPriority(true);
    taskEntity.setDone(false);
    taskEntity.setTag("test");
    taskEntity.setUser(userEntity);
    when(taskRepository.findById(taskId)).thenReturn(Optional.of(taskEntity));

    when(taskUrlRepository.findAllById_taskId(taskId)).thenReturn(List.of());

    String dueDate = "2026-12-31";

    TaskEntity savedTask = new TaskEntity();
    savedTask.setDescription("Test task updated");
    savedTask.setHighPriority(false);
    savedTask.setDueDate(LocalDate.parse(dueDate));
    savedTask.setDone(true);
    savedTask.setTag(taskEntity.getTag());
    when(taskRepository.save(any())).thenReturn(savedTask);

    UserTasksDonePk pk = new UserTasksDonePk(USER_ID, taskId);
    when(userTasksDoneRepository.findById(pk)).thenReturn(Optional.empty());

    TaskPatchRequest patch =
        new TaskPatchRequest("Test task updated", true, null, dueDate, false, "test");
    TaskResponse patched = taskService.patchTask(taskId, patch);

    assertNotNull(patched);
    assertEquals("Test task updated", patched.description());
    assertTrue(patched.done());
    assertEquals(TimeAgoUtil.formatDueDate(LocalDate.parse(dueDate)), patched.dueDateFmt());
    assertFalse(patched.highPriority());
    assertEquals("test", patched.tag());
    assertTrue(patched.urls().isEmpty());
  }

  @Test
  @DisplayName("Patch a task with url it should succeed")
  void patchTask_withUrl_shouldSucceed() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 2525L;

    TaskEntity taskEntity = new TaskEntity();
    taskEntity.setId(taskId);
    taskEntity.setDescription("Test task");
    taskEntity.setHighPriority(true);
    taskEntity.setDone(false);
    taskEntity.setTag("test");
    taskEntity.setUser(userEntity);
    when(taskRepository.findById(taskId)).thenReturn(Optional.of(taskEntity));

    TaskUrlEntity urlEntity = new TaskUrlEntity();
    urlEntity.setId(new TaskUrlEntityPk(taskId, "www.url.com"));
    when(taskUrlRepository.findAllById_taskId(taskId)).thenReturn(List.of(urlEntity));
    doNothing().when(taskUrlRepository).deleteAllById_taskId(taskId);

    String dueDate = "2026-12-31";

    TaskEntity savedTask = new TaskEntity();
    savedTask.setDescription("Test task updated");
    savedTask.setHighPriority(false);
    savedTask.setDueDate(LocalDate.parse(dueDate));
    savedTask.setDone(true);
    savedTask.setTag(taskEntity.getTag());
    when(taskRepository.save(any())).thenReturn(savedTask);

    UserTasksDonePk pk = new UserTasksDonePk(USER_ID, taskId);
    when(userTasksDoneRepository.findById(pk)).thenReturn(Optional.empty());

    String url = "http://test.com";
    TaskPatchRequest patch =
        new TaskPatchRequest("Test task updated", true, List.of(url), dueDate, false, "test");
    
    when(taskUrlRepository.saveAll(any())).thenReturn(List.of());
    TaskResponse patched = taskService.patchTask(taskId, patch);

    assertNotNull(patched);
    assertEquals("Test task updated", patched.description());
    assertTrue(patched.done());
    assertEquals(TimeAgoUtil.formatDueDate(LocalDate.parse(dueDate)), patched.dueDateFmt());
    assertFalse(patched.highPriority());
    assertEquals("test", patched.tag());
    assertFalse(patched.urls().isEmpty());
  }

  @Test
  @DisplayName("Patch a task with a not found task should fail")
  void patchTask_taskNotFound_shouldFail() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 2525L;

    when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

    TaskPatchRequest patch =
        new TaskPatchRequest("Test task updated", true, null, "2025-12-31", false, "test");

    assertThrows(TaskNotFoundException.class, () -> taskService.patchTask(taskId, patch));
  }

  @Test
  @DisplayName("Patch a task with a due date parse exception should fail")
  void patchTask_dueDateParseException_shouldFail() {
    when(authUtil.getCurrentUserEmail()).thenReturn(Optional.of(USER_EMAIL));

    UserEntity userEntity = new UserEntity();
    userEntity.setId(USER_ID);
    userEntity.setEmail(USER_EMAIL);
    when(authService.findByEmail(USER_EMAIL)).thenReturn(Optional.of(userEntity));

    Long taskId = 2525L;

    TaskEntity taskEntity = new TaskEntity();
    taskEntity.setId(taskId);
    taskEntity.setDescription("Test task");
    taskEntity.setHighPriority(true);
    taskEntity.setDone(false);
    taskEntity.setTag("test");
    taskEntity.setUser(userEntity);
    when(taskRepository.findById(taskId)).thenReturn(Optional.of(taskEntity));

    when(taskUrlRepository.findAllById_taskId(taskId)).thenReturn(List.of());

    TaskEntity savedTask = new TaskEntity();
    savedTask.setDescription("Test task updated");
    savedTask.setHighPriority(false);
    savedTask.setDone(true);
    savedTask.setTag(taskEntity.getTag());
    when(taskRepository.save(any())).thenReturn(savedTask);

    UserTasksDonePk pk = new UserTasksDonePk(USER_ID, taskId);
    when(userTasksDoneRepository.findById(pk)).thenReturn(Optional.empty());

    // wrong due date
    String dueDate = "2026-31-31";

    TaskPatchRequest patch =
        new TaskPatchRequest("Test task updated", true, null, dueDate, false, "test");
    TaskResponse patched = taskService.patchTask(taskId, patch);

    assertNotNull(patched);
    assertEquals("Test task updated", patched.description());
    assertTrue(patched.done());
    assertNull(patched.dueDate());
    assertNull(patched.dueDateFmt());
    assertFalse(patched.highPriority());
    assertEquals("test", patched.tag());
    assertTrue(patched.urls().isEmpty());
  }
}
