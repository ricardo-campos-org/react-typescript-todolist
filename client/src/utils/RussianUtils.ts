import { SERVER_RESPONSES } from '../constants/serverResponses';

/**
 * Translates a time ago message from English to Russian.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeAgoRu(textValue: string, numberValue: number): string {
  switch (textValue) {
    case 'years ago':
    case 'year ago':
      return textValue.includes('s ')
        ? `${numberValue} года назад`
        : `${numberValue} год назад`;
    case 'months ago':
    case 'month ago':
      return textValue.includes('s ')
        ? `${numberValue} месяца назад`
        : `${numberValue} месяц назад`;
    case 'days ago':
    case 'day ago':
      return textValue.includes('s ')
        ? `${numberValue} дня назад`
        : `${numberValue} день назад`;
    case 'hours ago':
    case 'hour ago':
      return textValue.includes('s ')
        ? `${numberValue} часа назад`
        : `${numberValue} час назад`;
    case 'minutes ago':
    case 'minute ago':
      return textValue.includes('s ')
        ? `${numberValue} минуты назад`
        : `${numberValue} минуту назад`;
    case 'seconds ago':
    case 'second ago':
      return textValue.includes('s ')
        ? `${numberValue} секунд назад`
        : `${numberValue} секунду назад`;
    default:
      return 'Несколько минут назад';
  }
}

/**
 * Translates a time left message from English to Russian.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeLeftRu(textValue: string, numberValue: number): string {
  switch (textValue) {
    case 'years left':
    case 'year left':
      return textValue.includes('s ')
        ? `осталось ${numberValue} лет`
        : `Остался ${numberValue} год`;
    case 'months left':
    case 'month left':
      return textValue.includes('s ')
        ? `осталось ${numberValue} месяцев`
        : `Остался ${numberValue} месяц`;
    case 'days left':
    case 'day left':
      return textValue.includes('s ')
        ? `осталось ${numberValue} дней`
        : `Остался ${numberValue} день`;
    default:
      return textValue;
  }
}

/**
 * Translates a server response message from English to Russian.
 *
 * @param {string} message The text message to be translated.
 * @returns The translated message.
 */
function translateServerResponseRu(message: string): string {
  switch (message) {
    case SERVER_RESPONSES.BAD_PASSWORD_3: {
      return 'Неправильный пароль: Пароль должен содержать не менее 8 символов, 1 заглавную букву, 1 специальный символ.';
    }
    case SERVER_RESPONSES.BAD_PASSWORD_2: {
      return 'Неправильный пароль: Пароль должен содержать как минимум 1 заглавную букву и 1 специальный символ.';
    }
    case SERVER_RESPONSES.BAD_PASSWORD_1: {
      return 'Неправильный пароль: Пароль должен содержать хотя бы 1 специальный символ.';
    }
    case SERVER_RESPONSES.EMAIL_EXISTS: {
      return 'Электронная почта уже существует!';
    }
    case SERVER_RESPONSES.FORBIDDEN: {
      return 'Запрещено! Доступ запрещен!';
    }
    case SERVER_RESPONSES.INTERNAL_ERROR: {
      return 'Внутренняя ошибка сервера!';
    }
    case SERVER_RESPONSES.MAX_LOGIN_ATTEMPT: {
      return 'Достигнут максимальный лимит попыток входа. Пожалуйста, подождите 30 минут';
    }
    case SERVER_RESPONSES.FILL_ALL_FIELDS: {
      return 'Пожалуйста, заполните все поля';
    }
    case SERVER_RESPONSES.FILL_USER_AND_PASS: {
      return 'Пожалуйста, введите свое имя пользователя и пароль!';
    }
    case SERVER_RESPONSES.FILL_AT_LEAST_3: {
      return 'Пожалуйста, введите не менее 3 символов';
    }
    case SERVER_RESPONSES.MAX_TEXT_LENGTH_2000: {
      return 'Максимальная длина текста — 2000.';
    }
    case SERVER_RESPONSES.UNKNOWN: {
      return 'Неизвестная ошибка';
    }
    case SERVER_RESPONSES.WRONG_OR_MISSING_INFO: {
      return 'Неверная или отсутствующая информация!';
    }
    case SERVER_RESPONSES.WRONG_USER_OR_PASS: {
      return 'Неправильный пользователь или пароль';
    }
    default: return message;
  }
}

export { translateTimeAgoRu, translateTimeLeftRu, translateServerResponseRu };
