import { TaskResponse } from '../types/TaskResponse';
import USER_LANG from '../types/UserLangs';

/**
 * Translates all responses from tasks server API.
 *
 * @param {TaskResponse[]} tasks The tasks to be translated.
 * @param {string} target The target language.
 * @returns {TaskResponse[]} Array of tasks translated into the target language.
 */
function translateTaskResponse(tasks: TaskResponse[], target: string): TaskResponse[] {
  tasks.forEach((task: TaskResponse) => {
    task.lastUpdate = translateMessage(task.lastUpdate, target);
    if (task.dueDateFmt) {
      task.dueDateFmt = translateMessage(task.dueDateFmt, target);
    }
  });
  return tasks;
}

/**
 * Translates a given message to a given language
 *
 * @param {string} message The message to be translated.
 * @param {string} target The target language. One of USER_LANG
 * @returns {string} The translated message.
 */
function translateMessage(message: string, target: string): string {
  let lang = USER_LANG.ENGLISH;
  if (target === USER_LANG.PORTUGUESE) {
    lang = USER_LANG.PORTUGUESE;
  }
  else if (target === USER_LANG.SPANISH) {
    lang = USER_LANG.SPANISH;
  }
  else if (target === USER_LANG.RUSSIAN) {
    lang = USER_LANG.RUSSIAN;
  }
  if (lang === USER_LANG.ENGLISH) {
    return message;
  }

  if (message.includes(' ago')) {
    const firstSpace = message.indexOf(' ');
    const numberValue = message.substring(0, firstSpace);
    const textValue = message.substring(firstSpace).trim();
    switch (textValue) {
      case 'years ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} anos atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} años`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} года назад`;
        }
        break;
      }
      case 'year ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} ano atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} año`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} год назад`;
        }
        break;
      }
      case 'months ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} meses atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} meses`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} месяца назад`;
        }
        // here
        break;
      }
      case 'month ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} mês atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} mes`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} месяц назад`;
        }
        break;
      }
      case 'days ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} dias atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} días`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} дня назад`;
        }
        break;
      }
      case 'day ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} dia atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} día`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} день назад`;
        }
        break;
      }
      case 'hours ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} horas atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} horas`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} часа назад`;
        }
        break;
      }
      case 'hour ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} hora atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} hora`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} час назад`;
        }
        break;
      }
      case 'minutes ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} minutos atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} minutos`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} минуты назад`;
        }
        break;
      }
      case 'minute ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} minuto atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} minuto`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} минуту назад`;
        }
        break;
      }
      case 'seconds ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} segundos atrás`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Hace ${numberValue} segundos`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `${numberValue} секунд назад`;
        }
        break;
      }
      case 'Moments ago': {
        if (lang === USER_LANG.PORTUGUESE) {
          return 'Momentos atrás';
        }
        else if (lang === USER_LANG.SPANISH) {
          return 'Hace momentos';
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return 'Несколько минут назад';
        }
      }
    }
  }

  if (message.includes(' left')) {
    const firstSpace = message.indexOf(' ');
    const numberValue = message.substring(0, firstSpace);
    const textValue = message.substring(firstSpace).trim();
    switch (textValue) {
      case 'years left': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} anos restantes`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Faltan ${numberValue} años`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `осталось ${numberValue} лет`;
        }
        break;
      }
      case 'year left': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} ano restante`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Falta ${numberValue} año`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `Остался ${numberValue} год`;
        }
        break;
      }
      case 'months left': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} meses restantes`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Faltan ${numberValue} meses`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `осталось ${numberValue} месяцев`;
        }
        break;
      }
      case 'month left': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} mês restante`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Falta ${numberValue} mes`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `Остался ${numberValue} месяц`;
        }
        break;
      }
      case 'days left': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} dias restantes`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Faltan ${numberValue} días`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `осталось ${numberValue} дней`;
        }
        break;
      }
      case 'day left': {
        if (lang === USER_LANG.PORTUGUESE) {
          return `${numberValue} dia restante`;
        }
        else if (lang === USER_LANG.SPANISH) {
          return `Falta ${numberValue} día`;
        }
        else if (lang === USER_LANG.RUSSIAN) {
          return `Остался ${numberValue} день`;
        }
        break;
      }
    }
  }

  switch (message) {
    case 'Bad password: Password must have at least at least 8 characters, 1 uppercase, 1 special character': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Senha fraca: Senha deve possuir pelo menos 8 letras, 1 maiúscula, 1 caracter especial';
      }
      else if (lang === USER_LANG.SPANISH) {
        return 'Contraseña inválida: La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Неправильный пароль: Пароль должен содержать не менее 8 символов, 1 заглавную букву, 1 специальный символ.';
      }
      break;
    }
    case 'Bad password: Password must have at least 1 uppercase, 1 special character': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Senha fraca: Senha deve possuir pelo menos 1 maiúscula, 1 caracter especial';
      }
      else if (lang === USER_LANG.SPANISH) {
        return 'Contraseña inválida: La contraseña debe tener al menos 1 mayúscula y 1 carácter especial';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Неправильный пароль: Пароль должен содержать как минимум 1 заглавную букву и 1 специальный символ.';
      }
      break;
    }
    case 'Bad password: Password must have at least 1 special character': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Senha fraca: Senha deve possuir pelo menos 1 caracter especial';
      }
      else if (lang === USER_LANG.SPANISH) {
        return 'Contraseña inválida: La contraseña debe tener al menos 1 carácter especial';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Неправильный пароль: Пароль должен содержать хотя бы 1 специальный символ.';
      }
      break;
    }
    case 'Email already exists!': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'E-mail já cadastrado!';
      }
      else if (lang === USER_LANG.SPANISH) {
        return '¡El correo ya está registrado!';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Электронная почта уже существует!';
      }
      break;
    }
    case 'Forbidden! Access denied!': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Proibido! Acesso negado';
      }
      else if (lang === USER_LANG.SPANISH) {
        return '¡Prohibido! Acceso denegado';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Запрещено! Доступ запрещен!';
      }
      break;
    }
    case 'Internal Server Error!': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Erro Interno do Servidor!';
      }
      else if (lang === USER_LANG.SPANISH) {
        return '¡Error interno del servidor!';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Внутренняя ошибка сервера!';
      }
      break;
    }
    case 'Max login attempt limit reached. Please wait 30 minutes': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Limite máximo de tentativas atingido. Por favor aguarde 30 minutos';
      }
      else if (lang === USER_LANG.SPANISH) {
        return 'Has alcanzado el límite máximo de intentos de inicio de sesión. Por favor, espera 30 minutos';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Достигнут максимальный лимит попыток входа. Пожалуйста, подождите 30 минут';
      }
      break;
    }
    case 'Please fill in all the fields': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Por ravor, preencha todos os campos';
      }
      else if (lang === USER_LANG.SPANISH) {
        return 'Por favor, completa todos los campos';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Пожалуйста, заполните все поля';
      }
      break;
    }
    case 'Please fill in your username and password!': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Por favor, informe seu e-mail e senha!';
      }
      else if (lang === USER_LANG.SPANISH) {
        return '¡Por favor, ingresa tu nombre de usuario y contraseña!';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Пожалуйста, введите свое имя пользователя и пароль!';
      }
      break;
    }
    case 'Please type at least 3 characters': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Por favor, digite pelo menos 3 letras';
      }
      else if (lang === USER_LANG.SPANISH) {
        return '¡Por favor, escriba al menos 3 caracteres';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Пожалуйста, введите не менее 3 символов';
      }
      break;
    }
    case 'The maximum text length is 2000': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'O tamanho máximo do texto é 2000';
      }
      else if (lang === USER_LANG.SPANISH) {
        return 'La longitud máxima del texto es 2000';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Максимальная длина текста — 2000.';
      }
      break;
    }
    case 'Unknown error': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Erro desconhecido';
      }
      else if (lang === USER_LANG.SPANISH) {
        return 'Error desconocido';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Неизвестная ошибка';
      }
      break;
    }
    case 'Wrong or missing information!': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'Informação errada ou incompleta!';
      }
      else if (lang === USER_LANG.SPANISH) {
        return '¡Información incorrecta o incompleta!';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Неверная или отсутствующая информация!';
      }
      break;
    }
    case 'Wrong user or password': {
      if (lang === USER_LANG.PORTUGUESE) {
        return 'E-mail ou senha inválidos!';
      }
      else if (lang === USER_LANG.SPANISH) {
        return '¡Usuario o contraseña incorrectos!';
      }
      else if (lang === USER_LANG.RUSSIAN) {
        return 'Неправильный пользователь или пароль';
      }
      break;
    }
    default: return '';
  }

  return '';
}

export { translateTaskResponse, translateMessage };
