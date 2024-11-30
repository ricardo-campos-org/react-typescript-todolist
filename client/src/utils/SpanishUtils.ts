/**
 * Translates a time ago message from English to Spanish.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeAgoEs(textValue: string, numberValue: number): string {
  if (textValue.includes('year')) {
    return textValue.includes('s ')
      ? `Hace ${numberValue} años`
      : `Hace ${numberValue} año`;
  }
  else if (textValue.includes('month')) {
    return textValue.includes('s ')
      ? `Hace ${numberValue} meses`
      : `Hace ${numberValue} mes`;
  }
  else if (textValue.includes('days')) {
    return textValue.includes('s ')
      ? `Hace ${numberValue} días`
      : `Hace ${numberValue} día`;
  }
  else if (textValue.includes('hour')) {
    return textValue.includes('s ')
      ? `Hace ${numberValue} horas`
      : `Hace ${numberValue} hora`;
  }
  else if (textValue.includes('minutes')) {
    return textValue.includes('s ')
      ? `Hace ${numberValue} minutos`
      : `Hace ${numberValue} minuto`;
  }
  else if (textValue.includes('seconds')) {
    return textValue.includes('s ')
      ? `Hace ${numberValue} segundos`
      : `Hace ${numberValue} segundo`;
  }

  return 'Hace momentos';
}

/**
 * Translates a time left message from English to Spanish.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeLeftEs(textValue: string, numberValue: number): string {
  if (textValue.includes('year')) {
    return textValue.includes('s ')
      ? `Faltan ${numberValue} años`
      : `Falta ${numberValue} año`;
  }
  else if (textValue.includes('month')) {
    return textValue.includes('s ')
      ? `Faltan ${numberValue} meses`
      : `Falta ${numberValue} mes`;
  }
  else if (textValue.includes('day')) {
    return textValue.includes('s ')
      ? `Faltan ${numberValue} días`
      : `Falta ${numberValue} día`;
  }
  return textValue;
}

/**
 * Translates a server response message from English to Spanish.
 *
 * @param {string} message The text message to be translated.
 * @returns The translated message.
 */
function translateServerResponseEs(message: string): string {
  switch (message) {
    case 'Bad password: Password must have at least at least 8 characters, 1 uppercase, 1 special character': {
      return 'Contraseña inválida: La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial';
    }
    case 'Bad password: Password must have at least 1 uppercase, 1 special character': {
      return 'Contraseña inválida: La contraseña debe tener al menos 1 mayúscula y 1 carácter especial';
    }
    case 'Bad password: Password must have at least 1 special character': {
      return 'Contraseña inválida: La contraseña debe tener al menos 1 carácter especial';
    }
    case 'Email already exists!': {
      return '¡El correo ya está registrado!';
    }
    case 'Forbidden! Access denied!': {
      return '¡Prohibido! Acceso denegado';
    }
    case 'Internal Server Error!': {
      return '¡Error interno del servidor!';
    }
    case 'Max login attempt limit reached. Please wait 30 minutes': {
      return 'Has alcanzado el límite máximo de intentos de inicio de sesión. Por favor, espera 30 minutos';
    }
    case 'Please fill in all the fields': {
      return 'Por favor, completa todos los campos';
    }
    case 'Please fill in your username and password!': {
      return '¡Por favor, ingresa tu nombre de usuario y contraseña!';
    }
    case 'Please type at least 3 characters': {
      return '¡Por favor, escriba al menos 3 caracteres';
    }
    case 'The maximum text length is 2000': {
      return 'La longitud máxima del texto es 2000';
    }
    case 'Unknown error': {
      return 'Error desconocido';
    }
    case 'Wrong or missing information!': {
      return '¡Información incorrecta o incompleta!';
    }
    case 'Wrong user or password': {
      return '¡Usuario o contraseña incorrectos!';
    }
    default: return message;
  }
}

export { translateTimeAgoEs, translateTimeLeftEs, translateServerResponseEs };
