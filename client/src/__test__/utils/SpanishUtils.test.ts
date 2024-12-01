import { describe, expect, it } from 'vitest';
import { translateTimeMessage } from '../../utils/TranslatorUtils';
import { translateServerResponseEs } from '../../utils/SpanishUtils';
import { SERVER_RESPONSES } from '../../constants/serverResponses';

describe('Portuguese Utils unit tests', () => {
  it('should translate all time ago messages to es', () => {
    expect(translateTimeMessage('2 years ago', 'es')).toBe('Hace 2 años');
    expect(translateTimeMessage('1 year ago', 'es')).toBe('Hace 1 año');
    expect(translateTimeMessage('2 months ago', 'es')).toBe('Hace 2 meses');
    expect(translateTimeMessage('1 month ago', 'es')).toBe('Hace 1 mes');
    expect(translateTimeMessage('2 days ago', 'es')).toBe('Hace 2 días');
    expect(translateTimeMessage('1 day ago', 'es')).toBe('Hace 1 día');
    expect(translateTimeMessage('2 hours ago', 'es')).toBe('Hace 2 horas');
    expect(translateTimeMessage('1 hour ago', 'es')).toBe('Hace 1 hora');
    expect(translateTimeMessage('2 minutes ago', 'es')).toBe('Hace 2 minutos');
    expect(translateTimeMessage('1 minute ago', 'es')).toBe('Hace 1 minuto');
    expect(translateTimeMessage('2 seconds ago', 'es')).toBe('Hace 2 segundos');
    expect(translateTimeMessage('1 second ago', 'es')).toBe('Hace 1 segundo');
    expect(translateTimeMessage('Moments ago', 'es')).toBe('Hace momentos');
    expect(translateTimeMessage('lala', 'es')).toBe('lala');
    expect(translateTimeMessage('null', 'es')).toBe('null');
  });

  it('should translate all time left messages to es', () => {
    expect(translateTimeMessage('2 years left', 'es')).toBe('Faltan 2 años');
    expect(translateTimeMessage('1 year left', 'es')).toBe('Falta 1 año');
    expect(translateTimeMessage('2 months left', 'es')).toBe('Faltan 2 meses');
    expect(translateTimeMessage('1 month left', 'es')).toBe('Falta 1 mes');
    expect(translateTimeMessage('2 days left', 'es')).toBe('Faltan 2 días');
    expect(translateTimeMessage('1 day left', 'es')).toBe('Falta 1 día');
    expect(translateTimeMessage('lala', 'es')).toBe('lala');
    expect(translateTimeMessage('null', 'es')).toBe('null');
  });

  it('should translate all server responses to es', () => {
    expect(translateServerResponseEs(SERVER_RESPONSES.BAD_PASSWORD_3))
      .toBe('Contraseña inválida: La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial');
    expect(translateServerResponseEs(SERVER_RESPONSES.BAD_PASSWORD_2))
      .toBe('Contraseña inválida: La contraseña debe tener al menos 1 mayúscula y 1 carácter especial');
    expect(translateServerResponseEs(SERVER_RESPONSES.BAD_PASSWORD_1))
      .toBe('Contraseña inválida: La contraseña debe tener al menos 1 carácter especial');
    expect(translateServerResponseEs(SERVER_RESPONSES.EMAIL_EXISTS))
      .toBe('¡El correo ya está registrado!');
    expect(translateServerResponseEs(SERVER_RESPONSES.FORBIDDEN))
      .toBe('¡Prohibido! Acceso denegado');
    expect(translateServerResponseEs(SERVER_RESPONSES.INTERNAL_ERROR))
      .toBe('¡Error interno del servidor!');
    expect(translateServerResponseEs(SERVER_RESPONSES.MAX_LOGIN_ATTEMPT))
      .toBe('Has alcanzado el límite máximo de intentos de inicio de sesión. Por favor, espera 30 minutos');
    expect(translateServerResponseEs(SERVER_RESPONSES.FILL_ALL_FIELDS))
      .toBe('Por favor, completa todos los campos');
    expect(translateServerResponseEs(SERVER_RESPONSES.FILL_USER_AND_PASS))
      .toBe('¡Por favor, ingresa tu nombre de usuario y contraseña!');
    expect(translateServerResponseEs(SERVER_RESPONSES.FILL_AT_LEAST_3))
      .toBe('¡Por favor, escriba al menos 3 caracteres!');
    expect(translateServerResponseEs(SERVER_RESPONSES.MAX_TEXT_LENGTH_2000))
      .toBe('La longitud máxima del texto es 2000');
    expect(translateServerResponseEs(SERVER_RESPONSES.UNKNOWN))
      .toBe('Error desconocido');
    expect(translateServerResponseEs(SERVER_RESPONSES.WRONG_OR_MISSING_INFO))
      .toBe('¡Información incorrecta o incompleta!');
    expect(translateServerResponseEs(SERVER_RESPONSES.WRONG_USER_OR_PASS))
      .toBe('¡Usuario o contraseña incorrectos!');
  });
});
