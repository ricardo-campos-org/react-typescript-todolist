import { describe, expect, it } from 'vitest';
import {
  translateServerResponseRu,
  translateTimeAgoRu,
  translateTimeLeftRu
} from '../../utils/RussianUtils';
import { SERVER_RESPONSES } from '../../constants/serverResponses';

describe('Portuguese Utils unit tests', () => {
  it('should translate all time ago messages to ru', () => {
    expect(translateTimeAgoRu('years ago', 2)).toBe('2 года назад');
    expect(translateTimeAgoRu('year ago', 1)).toBe('1 год назад');
    expect(translateTimeAgoRu('months ago', 2)).toBe('2 месяца назад');
    expect(translateTimeAgoRu('month ago', 1)).toBe('1 месяц назад');
    expect(translateTimeAgoRu('days ago', 2)).toBe('2 дня назад');
    expect(translateTimeAgoRu('day ago', 1)).toBe('1 день назад');
    expect(translateTimeAgoRu('hours ago', 2)).toBe('2 часа назад');
    expect(translateTimeAgoRu('hour ago', 1)).toBe('1 час назад');
    expect(translateTimeAgoRu('minutes ago', 2)).toBe('2 минуты назад');
    expect(translateTimeAgoRu('minute ago', 1)).toBe('1 минуту назад');
    expect(translateTimeAgoRu('seconds ago', 2)).toBe('2 секунд назад');
    expect(translateTimeAgoRu('second ago', 1)).toBe('1 секунду назад');
    expect(translateTimeAgoRu('lala', 1)).toBe('Несколько минут назад');
    expect(translateTimeAgoRu('null', 1)).toBe('Несколько минут назад');
    expect(translateTimeAgoRu('null', 0)).toBe('Несколько минут назад');
  });

  it('should translate all time left messages to ru', () => {
    expect(translateTimeLeftRu('years left', 2)).toBe('осталось 2 лет');
    expect(translateTimeLeftRu('year left', 1)).toBe('Остался 1 год');
    expect(translateTimeLeftRu('months left', 2)).toBe('осталось 2 месяцев');
    expect(translateTimeLeftRu('month left', 1)).toBe('Остался 1 месяц');
    expect(translateTimeLeftRu('days left', 2)).toBe('осталось 2 дней');
    expect(translateTimeLeftRu('day left', 1)).toBe('Остался 1 день');
    expect(translateTimeLeftRu('lala', 1)).toBe('lala');
    expect(translateTimeLeftRu('null', 1)).toBe('null');
    expect(translateTimeLeftRu('null', 0)).toBe('null');
  });

  it('should translate all server responses to ru', () => {
    expect(translateServerResponseRu(SERVER_RESPONSES.BAD_PASSWORD_3))
      .toBe('Неправильный пароль: Пароль должен содержать не менее 8 символов, 1 заглавную букву, 1 специальный символ.');
    expect(translateServerResponseRu(SERVER_RESPONSES.BAD_PASSWORD_2))
      .toBe('Неправильный пароль: Пароль должен содержать как минимум 1 заглавную букву и 1 специальный символ.');
    expect(translateServerResponseRu(SERVER_RESPONSES.BAD_PASSWORD_1))
      .toBe('Неправильный пароль: Пароль должен содержать хотя бы 1 специальный символ.');
    expect(translateServerResponseRu(SERVER_RESPONSES.EMAIL_EXISTS))
      .toBe('Электронная почта уже существует!');
    expect(translateServerResponseRu(SERVER_RESPONSES.FORBIDDEN))
      .toBe('Запрещено! Доступ запрещен!');
    expect(translateServerResponseRu(SERVER_RESPONSES.INTERNAL_ERROR))
      .toBe('Внутренняя ошибка сервера!');
    expect(translateServerResponseRu(SERVER_RESPONSES.MAX_LOGIN_ATTEMPT))
      .toBe('Достигнут максимальный лимит попыток входа. Пожалуйста, подождите 30 минут');
    expect(translateServerResponseRu(SERVER_RESPONSES.FILL_ALL_FIELDS))
      .toBe('Пожалуйста, заполните все поля');
    expect(translateServerResponseRu(SERVER_RESPONSES.FILL_USER_AND_PASS))
      .toBe('Пожалуйста, введите свое имя пользователя и пароль!');
    expect(translateServerResponseRu(SERVER_RESPONSES.FILL_AT_LEAST_3))
      .toBe('Пожалуйста, введите не менее 3 символов');
    expect(translateServerResponseRu(SERVER_RESPONSES.MAX_TEXT_LENGTH_2000))
      .toBe('Максимальная длина текста — 2000.');
    expect(translateServerResponseRu(SERVER_RESPONSES.UNKNOWN))
      .toBe('Неизвестная ошибка');
    expect(translateServerResponseRu(SERVER_RESPONSES.WRONG_OR_MISSING_INFO))
      .toBe('Неверная или отсутствующая информация!');
    expect(translateServerResponseRu(SERVER_RESPONSES.WRONG_USER_OR_PASS))
      .toBe('Неправильный пользователь или пароль');
  });
});
