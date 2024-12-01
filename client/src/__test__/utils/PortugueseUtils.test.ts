import { describe, expect, it } from 'vitest';
import {
  translateServerResponsePtBr,
  translateTimeAgoPtBr,
  translateTimeLeftPtBr
} from '../../utils/PortugueseUtils';
import { SERVER_RESPONSES } from '../../constants/serverResponses';

describe('Portuguese Utils unit tests', () => {
  it('should translate all time ago messages to pt_br', () => {
    expect(translateTimeAgoPtBr('years ago', 2)).toBe('2 anos atrás');
    expect(translateTimeAgoPtBr('year ago', 1)).toBe('1 ano atrás');
    expect(translateTimeAgoPtBr('months ago', 2)).toBe('2 meses atrás');
    expect(translateTimeAgoPtBr('month ago', 1)).toBe('1 mês atrás');
    expect(translateTimeAgoPtBr('days ago', 2)).toBe('2 dias atrás');
    expect(translateTimeAgoPtBr('day ago', 1)).toBe('1 dia atrás');
    expect(translateTimeAgoPtBr('hours ago', 2)).toBe('2 horas atrás');
    expect(translateTimeAgoPtBr('hour ago', 1)).toBe('1 hora atrás');
    expect(translateTimeAgoPtBr('minutes ago', 2)).toBe('2 minutos atrás');
    expect(translateTimeAgoPtBr('minute ago', 1)).toBe('1 minuto atrás');
    expect(translateTimeAgoPtBr('seconds ago', 2)).toBe('2 segundos atrás');
    expect(translateTimeAgoPtBr('second ago', 1)).toBe('1 segundo atrás');
    expect(translateTimeAgoPtBr('lala', 1)).toBe('Momentos atrás');
    expect(translateTimeAgoPtBr('null', 1)).toBe('Momentos atrás');
    expect(translateTimeAgoPtBr('null', 0)).toBe('Momentos atrás');
  });

  it('should translate all time left messages to pt_br', () => {
    expect(translateTimeLeftPtBr('years left', 2)).toBe('2 anos restantes');
    expect(translateTimeLeftPtBr('year left', 1)).toBe('1 ano restante');
    expect(translateTimeLeftPtBr('months left', 2)).toBe('2 meses restantes');
    expect(translateTimeLeftPtBr('month left', 1)).toBe('1 mês restante');
    expect(translateTimeLeftPtBr('days left', 2)).toBe('2 dias restantes');
    expect(translateTimeLeftPtBr('day left', 1)).toBe('1 dia restante');
    expect(translateTimeLeftPtBr('lala', 1)).toBe('lala');
    expect(translateTimeLeftPtBr('null', 1)).toBe('null');
    expect(translateTimeLeftPtBr('null', 0)).toBe('null');
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
