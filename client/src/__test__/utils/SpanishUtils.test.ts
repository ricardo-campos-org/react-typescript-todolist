import { describe, expect, it } from 'vitest';
import {
  translateServerResponseEs,
  translateTimeAgoEs,
  translateTimeLeftEs
} from '../../utils/SpanishUtils';
import { SERVER_RESPONSES } from '../../constants/serverResponses';

describe('Portuguese Utils unit tests', () => {
  it('should translate all time ago messages to pt_br', () => {
    expect(translateTimeAgoEs('years ago', 2)).toBe('Hace 2 años');
    expect(translateTimeAgoEs('year ago', 1)).toBe('Hace 1 año');
    expect(translateTimeAgoEs('months ago', 2)).toBe('Hace 2 meses');
    expect(translateTimeAgoEs('month ago', 1)).toBe('Hace 1 mes');
    expect(translateTimeAgoEs('days ago', 2)).toBe('Hace 2 días');
    expect(translateTimeAgoEs('day ago', 1)).toBe('Hace 1 día');
    expect(translateTimeAgoEs('hours ago', 2)).toBe('Hace 2 horas');
    expect(translateTimeAgoEs('hour ago', 1)).toBe('Hace 1 hora');
    expect(translateTimeAgoEs('minutes ago', 2)).toBe('Hace 2 minutos');
    expect(translateTimeAgoEs('minute ago', 1)).toBe('Hace 1 minuto');
    expect(translateTimeAgoEs('seconds ago', 2)).toBe('Hace 2 segundos');
    expect(translateTimeAgoEs('second ago', 1)).toBe('Hace 1 segundo');
    expect(translateTimeAgoEs('lala', 1)).toBe('Hace momentos');
    expect(translateTimeAgoEs('null', 1)).toBe('Hace momentos');
    expect(translateTimeAgoEs('null', 0)).toBe('Hace momentos');
  });

  it('should translate all time left messages to pt_br', () => {
    expect(translateTimeLeftEs('years left', 2)).toBe('Faltan 2 años');
    expect(translateTimeLeftEs('year left', 1)).toBe('Falta 1 año');
    expect(translateTimeLeftEs('months left', 2)).toBe('Faltan 2 meses');
    expect(translateTimeLeftEs('month left', 1)).toBe('Falta 1 mes');
    expect(translateTimeLeftEs('days left', 2)).toBe('Faltan 2 días');
    expect(translateTimeLeftEs('day left', 1)).toBe('Falta 1 día');
    expect(translateTimeLeftEs('lala', 1)).toBe('lala');
    expect(translateTimeLeftEs('null', 1)).toBe('null');
    expect(translateTimeLeftEs('null', 0)).toBe('null');
  });

  it('should translate all server responses to pt_br', () => {
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
