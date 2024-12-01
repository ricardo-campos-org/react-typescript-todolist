import { describe, expect, it } from 'vitest';
import { translateTimeMessage } from '../../utils/TranslatorUtils';
import { translateServerResponseRu } from '../../utils/RussianUtils';
import { SERVER_RESPONSES } from '../../constants/serverResponses';

describe('Portuguese Utils unit tests', () => {
  it('should translate all time ago messages to ru', () => {
    expect(translateTimeMessage('2 years ago', 'ru')).toBe('2 года назад');
    expect(translateTimeMessage('1 year ago', 'ru')).toBe('1 год назад');
    expect(translateTimeMessage('2 months ago', 'ru')).toBe('2 месяца назад');
    expect(translateTimeMessage('1 month ago', 'ru')).toBe('1 месяц назад');
    expect(translateTimeMessage('2 days ago', 'ru')).toBe('2 дня назад');
    expect(translateTimeMessage('1 day ago', 'ru')).toBe('1 день назад');
    expect(translateTimeMessage('2 hours ago', 'ru')).toBe('2 часа назад');
    expect(translateTimeMessage('1 hour ago', 'ru')).toBe('1 час назад');
    expect(translateTimeMessage('2 minutes ago', 'ru')).toBe('2 минуты назад');
    expect(translateTimeMessage('1 minute ago', 'ru')).toBe('1 минуту назад');
    expect(translateTimeMessage('2 seconds ago', 'ru')).toBe('2 секунд назад');
    expect(translateTimeMessage('1 second ago', 'ru')).toBe('1 секунду назад');
    expect(translateTimeMessage('Moments ago', 'ru')).toBe('Несколько минут назад');
    expect(translateTimeMessage('lala', 'ru')).toBe('lala');
    expect(translateTimeMessage('null', 'ru')).toBe('null');
  });

  it('should translate all time left messages to ru', () => {
    expect(translateTimeMessage('2 years left', 'ru')).toBe('осталось 2 лет');
    expect(translateTimeMessage('1 year left', 'ru')).toBe('Остался 1 год');
    expect(translateTimeMessage('2 months left', 'ru')).toBe('осталось 2 месяцев');
    expect(translateTimeMessage('1 month left', 'ru')).toBe('Остался 1 месяц');
    expect(translateTimeMessage('2 days left', 'ru')).toBe('осталось 2 дней');
    expect(translateTimeMessage('1 day left', 'ru')).toBe('Остался 1 день');
    expect(translateTimeMessage('lala', 'ru')).toBe('lala');
    expect(translateTimeMessage('null', 'ru')).toBe('null');
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
