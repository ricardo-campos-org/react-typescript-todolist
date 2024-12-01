import { SERVER_RESPONSES } from '../constants/serverResponses';

/**
 * Translates a server response message from English to Spanish.
 *
 * @param {string} message The text message to be translated.
 * @returns The translated message.
 */
function translateServerResponseEs(message: string): string {
  switch (message) {
    case SERVER_RESPONSES.BAD_PASSWORD_3: {
      return 'Contraseña inválida: La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial';
    }
    case SERVER_RESPONSES.BAD_PASSWORD_2: {
      return 'Contraseña inválida: La contraseña debe tener al menos 1 mayúscula y 1 carácter especial';
    }
    case SERVER_RESPONSES.BAD_PASSWORD_1: {
      return 'Contraseña inválida: La contraseña debe tener al menos 1 carácter especial';
    }
    case SERVER_RESPONSES.EMAIL_EXISTS: {
      return '¡El correo ya está registrado!';
    }
    case SERVER_RESPONSES.FORBIDDEN: {
      return '¡Prohibido! Acceso denegado';
    }
    case SERVER_RESPONSES.INTERNAL_ERROR: {
      return '¡Error interno del servidor!';
    }
    case SERVER_RESPONSES.MAX_LOGIN_ATTEMPT: {
      return 'Has alcanzado el límite máximo de intentos de inicio de sesión. Por favor, espera 30 minutos';
    }
    case SERVER_RESPONSES.FILL_ALL_FIELDS: {
      return 'Por favor, completa todos los campos';
    }
    case SERVER_RESPONSES.FILL_USER_AND_PASS: {
      return '¡Por favor, ingresa tu nombre de usuario y contraseña!';
    }
    case SERVER_RESPONSES.FILL_AT_LEAST_3: {
      return '¡Por favor, escriba al menos 3 caracteres!';
    }
    case SERVER_RESPONSES.MAX_TEXT_LENGTH_2000: {
      return 'La longitud máxima del texto es 2000';
    }
    case SERVER_RESPONSES.UNKNOWN: {
      return 'Error desconocido';
    }
    case SERVER_RESPONSES.WRONG_OR_MISSING_INFO: {
      return '¡Información incorrecta o incompleta!';
    }
    case SERVER_RESPONSES.WRONG_USER_OR_PASS: {
      return '¡Usuario o contraseña incorrectos!';
    }
    default: return message;
  }
}

export { translateServerResponseEs };
