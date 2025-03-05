package br.com.tasknoteapp.server.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "This record represents the data for the completed tasks chart.")
public record TasksChartResponse(
  @Schema(description = "The full date.") LocalDateTime date,
  @Schema(description = "The day. F for Friday and so on.", example = "F") String day,
  @Schema(description = "The amount for the day", example = "1") Integer count) {}
