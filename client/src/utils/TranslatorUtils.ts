/**
Email already exists!/**
 * Translates a given message to a given language
 *
 * @param {string} message The message to be translated.
 * @param {string} target The target language. One of 'es' or 'pt_br'
 * @returns {string} The translated message.
 */
function translateMessage(message: string, target: string): string {
  if (target === 'en') {
    return message;
  }

  if (target === 'pt_br') {
    switch (message) {
      case 'Email already exists!': {
        return 'E-mail já cadastrado!';
      }
      case 'Forbidden! Access denied!': {
        return 'Proibido! Acesso negado';
      }
      case 'Internal Server Error!': {
        return 'Erro Interno do Servidor!';
      }
      case 'Please fill in your username and password!': {
        return 'Por favor informe seu e-mail e senha!';
      }
      case 'Unknown error': {
        return 'Erro desconhecido';
      }
      case 'Wrong or missing information!': {
        return 'Informação errada ou incompleta!';
      }
      case 'Wrong username or password!': {
        return 'E-mail ou senha inválidos!';
      }
      default: return '';
    }
  }
  return message;
}

export { translateMessage };
