package br.com.tasknoteapp.server.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

/** This record represents a task patch payload. */
@Schema(description = "Task patch payload.")
public record TaskPatchRequest(
    @Schema(description = "Task description. Optional.") String description,
    @Schema(description = "Task done definition. Optional.") Boolean done,
    @Schema(description = "Task urls. Optional.") List<String> urls,
    @Schema(description = "Due date. Optional.") String dueDate,
    @Schema(description = "Define high priority. Optional.") Boolean highPriority,
    @Schema(description = "Task tag, optional.") String tag) {}
