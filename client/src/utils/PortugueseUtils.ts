import { SERVER_RESPONSES } from '../constants/serverResponses';

/**
 * Translates a server response message from English to brazilian Portuguese.
 *
 * @param {string} message The text message to be translated.
 * @returns The translated message.
 */
function translateServerResponsePtBr(message: string): string {
  switch (message) {
    case SERVER_RESPONSES.BAD_PASSWORD_3: {
      return 'Senha fraca: Senha deve possuir pelo menos 8 letras, 1 maiúscula, 1 caracter especial';
    }
    case SERVER_RESPONSES.BAD_PASSWORD_2: {
      return 'Senha fraca: Senha deve possuir pelo menos 1 maiúscula, 1 caracter especial';
    }
    case SERVER_RESPONSES.BAD_PASSWORD_1: {
      return 'Senha fraca: Senha deve possuir pelo menos 1 caracter especial';
    }
    case SERVER_RESPONSES.EMAIL_EXISTS: {
      return 'E-mail já cadastrado!';
    }
    case SERVER_RESPONSES.FORBIDDEN: {
      return 'Proibido! Acesso negado';
    }
    case SERVER_RESPONSES.INTERNAL_ERROR: {
      return 'Erro Interno do Servidor!';
    }
    case SERVER_RESPONSES.MAX_LOGIN_ATTEMPT: {
      return 'Limite máximo de tentativas atingido. Por favor aguarde 30 minutos';
    }
    case SERVER_RESPONSES.FILL_ALL_FIELDS: {
      return 'Por ravor, preencha todos os campos';
    }
    case SERVER_RESPONSES.FILL_USER_AND_PASS: {
      return 'Por favor, informe seu e-mail e senha!';
    }
    case SERVER_RESPONSES.FILL_AT_LEAST_3: {
      return 'Por favor, digite pelo menos 3 letras';
    }
    case SERVER_RESPONSES.MAX_TEXT_LENGTH_2000: {
      return 'O tamanho máximo do texto é 2000';
    }
    case SERVER_RESPONSES.UNKNOWN: {
      return 'Erro desconhecido';
    }
    case SERVER_RESPONSES.WRONG_OR_MISSING_INFO: {
      return 'Informação errada ou incompleta!';
    }
    case SERVER_RESPONSES.WRONG_USER_OR_PASS: {
      return 'E-mail ou senha inválidos!';
    }
    default: return message;
  }
}

export { translateServerResponsePtBr };
