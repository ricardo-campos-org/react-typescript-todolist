/**
 * Translates a time ago message from English to Russian.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeAgoRu(textValue: string, numberValue: number): string {
  if (textValue.includes('year')) {
    return textValue.includes('s ')
      ? `${numberValue} года назад`
      : `${numberValue} год назад`;
  }
  else if (textValue.includes('month')) {
    return textValue.includes('s ')
      ? `${numberValue} месяца назад`
      : `${numberValue} месяц назад`;
  }
  else if (textValue.includes('days')) {
    return textValue.includes('s ')
      ? `${numberValue} дня назад`
      : `${numberValue} день назад`;
  }
  else if (textValue.includes('hour')) {
    return textValue.includes('s ')
      ? `${numberValue} часа назад`
      : `${numberValue} час назад`;
  }
  else if (textValue.includes('minutes')) {
    return textValue.includes('s ')
      ? `${numberValue} минуты назад`
      : `${numberValue} минуту назад`;
  }
  else if (textValue.includes('seconds')) {
    return textValue.includes('s ')
      ? `${numberValue} секунд назад`
      : `${numberValue} секунду назад`;
  }

  return 'Несколько минут назад';
}

/**
 * Translates a time left message from English to Russian.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeLeftRu(textValue: string, numberValue: number): string {
  if (textValue.includes('year')) {
    return textValue.includes('s ')
      ? `осталось ${numberValue} лет`
      : `Остался ${numberValue} год`;
  }
  else if (textValue.includes('month')) {
    return textValue.includes('s ')
      ? `осталось ${numberValue} месяцев`
      : `Остался ${numberValue} месяц`;
  }
  else if (textValue.includes('day')) {
    return textValue.includes('s ')
      ? `осталось ${numberValue} дней`
      : `Остался ${numberValue} день`;
  }
  return textValue;
}

/**
 * Translates a server response message from English to Russian.
 *
 * @param {string} message The text message to be translated.
 * @returns The translated message.
 */
function translateServerResponseRu(message: string): string {
  switch (message) {
    case 'Bad password: Password must have at least at least 8 characters, 1 uppercase, 1 special character': {
      return 'Неправильный пароль: Пароль должен содержать не менее 8 символов, 1 заглавную букву, 1 специальный символ.';
    }
    case 'Bad password: Password must have at least 1 uppercase, 1 special character': {
      return 'Неправильный пароль: Пароль должен содержать как минимум 1 заглавную букву и 1 специальный символ.';
    }
    case 'Bad password: Password must have at least 1 special character': {
      return 'Неправильный пароль: Пароль должен содержать хотя бы 1 специальный символ.';
    }
    case 'Email already exists!': {
      return 'Электронная почта уже существует!';
    }
    case 'Forbidden! Access denied!': {
      return 'Запрещено! Доступ запрещен!';
    }
    case 'Internal Server Error!': {
      return 'Внутренняя ошибка сервера!';
    }
    case 'Max login attempt limit reached. Please wait 30 minutes': {
      return 'Достигнут максимальный лимит попыток входа. Пожалуйста, подождите 30 минут';
    }
    case 'Please fill in all the fields': {
      return 'Пожалуйста, заполните все поля';
    }
    case 'Please fill in your username and password!': {
      return 'Пожалуйста, введите свое имя пользователя и пароль!';
    }
    case 'Please type at least 3 characters': {
      return 'Пожалуйста, введите не менее 3 символов';
    }
    case 'The maximum text length is 2000': {
      return 'Максимальная длина текста — 2000.';
    }
    case 'Unknown error': {
      return 'Неизвестная ошибка';
    }
    case 'Wrong or missing information!': {
      return 'Неверная или отсутствующая информация!';
    }
    case 'Wrong user or password': {
      return 'Неправильный пользователь или пароль';
    }
    default: return message;
  }
}

export { translateTimeAgoRu, translateTimeLeftRu, translateServerResponseRu };
