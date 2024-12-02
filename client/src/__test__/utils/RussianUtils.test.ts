import { describe, expect, it } from 'vitest';
import { translateTimeMessage, translateServerResponse } from '../../utils/TranslatorUtils';
import { serverResponses } from '../../constants/serverResponses';

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
    const keys: string[] = Object.keys(serverResponses);

    expect(translateServerResponse(keys[0], 'ru'))
      .toBe('Неправильный пароль: Пароль должен содержать не менее 8 символов, 1 заглавную букву, 1 специальный символ.');
    expect(translateServerResponse(keys[1], 'ru'))
      .toBe('Неправильный пароль: Пароль должен содержать как минимум 1 заглавную букву и 1 специальный символ.');
    expect(translateServerResponse(keys[2], 'ru'))
      .toBe('Неправильный пароль: Пароль должен содержать хотя бы 1 специальный символ.');
    expect(translateServerResponse(keys[3], 'ru'))
      .toBe('Электронная почта уже существует!');
    expect(translateServerResponse(keys[4], 'ru'))
      .toBe('Запрещено! Доступ запрещен!');
    expect(translateServerResponse(keys[5], 'ru'))
      .toBe('Внутренняя ошибка сервера!');
    expect(translateServerResponse(keys[6], 'ru'))
      .toBe('Достигнут максимальный лимит попыток входа. Пожалуйста, подождите 30 минут');
    expect(translateServerResponse(keys[7], 'ru'))
      .toBe('Пожалуйста, заполните все поля');
    expect(translateServerResponse(keys[8], 'ru'))
      .toBe('Пожалуйста, введите свое имя пользователя и пароль!');
    expect(translateServerResponse(keys[9], 'ru'))
      .toBe('Пожалуйста, введите не менее 3 символов');
    expect(translateServerResponse(keys[10], 'ru'))
      .toBe('Максимальная длина текста — 2000.');
    expect(translateServerResponse(keys[11], 'ru'))
      .toBe('Неизвестная ошибка');
    expect(translateServerResponse(keys[12], 'ru'))
      .toBe('Неверная или отсутствующая информация!');
    expect(translateServerResponse(keys[13], 'ru'))
      .toBe('Неправильный пользователь или пароль');
  });
});
