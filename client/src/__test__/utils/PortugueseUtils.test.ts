import { describe, expect, it } from 'vitest';
import { translateTimeMessage } from '../../utils/TranslatorUtils';
import { SERVER_RESPONSES } from '../../constants/serverResponses';
import { translateServerResponsePtBr } from '../../utils/PortugueseUtils';

describe('Portuguese Utils unit tests', () => {
  it('should translate all time ago messages to pt_br', () => {
    expect(translateTimeMessage('2 years ago', 'pt_br')).toBe('2 anos atrás');
    expect(translateTimeMessage('1 year ago', 'pt_br')).toBe('1 ano atrás');
    expect(translateTimeMessage('2 months ago', 'pt_br')).toBe('2 meses atrás');
    expect(translateTimeMessage('1 month ago', 'pt_br')).toBe('1 mês atrás');
    expect(translateTimeMessage('2 days ago', 'pt_br')).toBe('2 dias atrás');
    expect(translateTimeMessage('1 day ago', 'pt_br')).toBe('1 dia atrás');
    expect(translateTimeMessage('2 hours ago', 'pt_br')).toBe('2 horas atrás');
    expect(translateTimeMessage('1 hour ago', 'pt_br')).toBe('1 hora atrás');
    expect(translateTimeMessage('2 minutes ago', 'pt_br')).toBe('2 minutos atrás');
    expect(translateTimeMessage('1 minute ago', 'pt_br')).toBe('1 minuto atrás');
    expect(translateTimeMessage('2 seconds ago', 'pt_br')).toBe('2 segundos atrás');
    expect(translateTimeMessage('1 second ago', 'pt_br')).toBe('1 segundo atrás');
    expect(translateTimeMessage('Moments ago', 'pt_br')).toBe('Momentos atrás');
    expect(translateTimeMessage('lala', 'pt_br')).toBe('lala');
    expect(translateTimeMessage('null', 'pt_br')).toBe('null');
  });

  it('should translate all time left messages to pt_br', () => {
    expect(translateTimeMessage('2 years left', 'pt_br')).toBe('2 anos restantes');
    expect(translateTimeMessage('1 year left', 'pt_br')).toBe('1 ano restante');
    expect(translateTimeMessage('2 months left', 'pt_br')).toBe('2 meses restantes');
    expect(translateTimeMessage('1 month left', 'pt_br')).toBe('1 mês restante');
    expect(translateTimeMessage('2 days left', 'pt_br')).toBe('2 dias restantes');
    expect(translateTimeMessage('1 day left', 'pt_br')).toBe('1 dia restante');
    expect(translateTimeMessage('lala', 'pt_br')).toBe('lala');
    expect(translateTimeMessage('null', 'pt_br')).toBe('null');
  });

  it('should translate all server responses to pt_br', () => {
    expect(translateServerResponsePtBr(SERVER_RESPONSES.BAD_PASSWORD_3))
      .toBe('Senha fraca: Senha deve possuir pelo menos 8 letras, 1 maiúscula, 1 caracter especial');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.BAD_PASSWORD_2))
      .toBe('Senha fraca: Senha deve possuir pelo menos 1 maiúscula, 1 caracter especial');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.BAD_PASSWORD_1))
      .toBe('Senha fraca: Senha deve possuir pelo menos 1 caracter especial');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.EMAIL_EXISTS))
      .toBe('E-mail já cadastrado!');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.FORBIDDEN))
      .toBe('Proibido! Acesso negado');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.INTERNAL_ERROR))
      .toBe('Erro Interno do Servidor!');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.MAX_LOGIN_ATTEMPT))
      .toBe('Limite máximo de tentativas atingido. Por favor aguarde 30 minutos');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.FILL_ALL_FIELDS))
      .toBe('Por ravor, preencha todos os campos');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.FILL_USER_AND_PASS))
      .toBe('Por favor, informe seu e-mail e senha!');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.FILL_AT_LEAST_3))
      .toBe('Por favor, digite pelo menos 3 letras');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.MAX_TEXT_LENGTH_2000))
      .toBe('O tamanho máximo do texto é 2000');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.UNKNOWN))
      .toBe('Erro desconhecido');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.WRONG_OR_MISSING_INFO))
      .toBe('Informação errada ou incompleta!');
    expect(translateServerResponsePtBr(SERVER_RESPONSES.WRONG_USER_OR_PASS))
      .toBe('E-mail ou senha inválidos!');
  });
});
