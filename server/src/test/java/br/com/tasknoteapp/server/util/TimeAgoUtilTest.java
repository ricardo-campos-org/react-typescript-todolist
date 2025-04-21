package br.com.tasknoteapp.server.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.Locale;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class TimeAgoUtilTest {

  @Test
  void formatTest() {
    Assertions.assertEquals("1 hour ago", TimeAgoUtil.format(LocalDateTime.now().minusHours(1L)));
    Assertions.assertEquals("2 hours ago", TimeAgoUtil.format(LocalDateTime.now().minusHours(2L)));
    Assertions.assertEquals("1 day ago", TimeAgoUtil.format(LocalDateTime.now().minusDays(1L)));
    Assertions.assertEquals("2 days ago", TimeAgoUtil.format(LocalDateTime.now().minusDays(2L)));
    Assertions.assertEquals("1 month ago", TimeAgoUtil.format(LocalDateTime.now().minusMonths(1L)));
    Assertions.assertEquals(
        "2 months ago", TimeAgoUtil.format(LocalDateTime.now().minusMonths(2L)));
  }

  @Test
  void formatDueDateTest() {
    Assertions.assertNull(TimeAgoUtil.formatDueDate(null));

    LocalDate localDate1 = LocalDate.now().plusDays(1L);
    String expected1 = "1 day left" + getFormattedSuffix(localDate1);
    Assertions.assertEquals(expected1, TimeAgoUtil.formatDueDate(localDate1));

    LocalDate localDate2 = LocalDate.now().plusDays(12L);
    String expected2 = "12 days left" + getFormattedSuffix(localDate2);
    Assertions.assertEquals(expected2, TimeAgoUtil.formatDueDate(localDate2));
  }

  private String getFormattedSuffix(LocalDate futureDate) {
    String dayOfWeek = futureDate.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
    int dayOfMonth = futureDate.getDayOfMonth();
    String suffix = getDaySuffix(dayOfMonth);
    String month = futureDate.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
    int year = futureDate.getYear();
    return String.format(" (%s %d%s, %s %d)", dayOfWeek, dayOfMonth, suffix, month, year);
  }

  private static String getDaySuffix(int day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    return switch (day % 10) {
      case 1 -> "st";
      case 2 -> "nd";
      case 3 -> "rd";
      default -> "th";
    };
  }
}
