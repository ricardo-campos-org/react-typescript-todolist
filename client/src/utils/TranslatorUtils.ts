import USER_LANG from '../types/UserLangs';

/**
Email already exists!/**
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
  } else if (target === USER_LANG.SPANISH) {
    lang = USER_LANG.SPANISH;
  }
  if (lang === USER_LANG.ENGLISH) {
    return message;
  }

  switch (message) {
    case 'Bad password: Password must have at least at least 8 characters, 1 uppercase, 1 special character': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Senha fraca: Senha deve possuir pelo menos 8 letras, 1 maiúscula, 1 caracter especial'
        : 'Contraseña inválida: La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial';
    }
    case 'Bad password: Password must have at least 1 uppercase, 1 special character': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Senha fraca: Senha deve possuir pelo menos 1 maiúscula, 1 caracter especial'
        : 'Contraseña inválida: La contraseña debe tener al menos 1 mayúscula y 1 carácter especial';
    }
    case 'Bad password: Password must have at least 1 special character': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Senha fraca: Senha deve possuir pelo menos 1 caracter especial'
        : 'Contraseña inválida: La contraseña debe tener al menos 1 carácter especial';
    }
    case 'Email already exists!': {
      return lang === USER_LANG.PORTUGUESE
        ? 'E-mail já cadastrado!'
        : '¡El correo ya está registrado!';
    }
    case 'Forbidden! Access denied!': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Proibido! Acesso negado'
        : '¡Prohibido! Acceso denegado';
    }
    case 'Internal Server Error!': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Erro Interno do Servidor!'
        : '¡Error interno del servidor!';
    }
    case 'Max login attempt limit reached. Please wait 30 minutes': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Limite máximo de tentativas atingido. Por favor aguarde 30 minutos'
        : 'Has alcanzado el límite máximo de intentos de inicio de sesión. Por favor, espera 30 minutos';
    }
    case 'Please fill in all the fields': {
      return lang === USER_LANG.PORTUGUESE
      ? 'Por ravor, preencha todos os campos'
      : 'Por favor, completa todos los campos';
    }
    case 'Please fill in your username and password!': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Por favor, informe seu e-mail e senha!'
        : '¡Por favor, ingresa tu nombre de usuario y contraseña!';
    }
    case 'Please type at least 3 characters': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Por favor, digite pelo menos 3 letras'
        : '¡Por favor, escriba al menos 3 caracteres';
    }
    case 'Unknown error': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Erro desconhecido'
        : 'Error desconocido';
    }
    case 'Wrong or missing information!': {
      return lang === USER_LANG.PORTUGUESE
        ? 'Informação errada ou incompleta!'
        : '¡Información incorrecta o incompleta!';
    }
    case 'Wrong user or password': {
      return lang === USER_LANG.PORTUGUESE
        ? 'E-mail ou senha inválidos!'
        : '¡Usuario o contraseña incorrectos!';
    }
    default: return '';
  }
}

export { translateMessage };
