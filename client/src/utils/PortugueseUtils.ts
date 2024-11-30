/**
 * Translates a time ago message from English to Brazilian Portuguese.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeAgoPtBr(textValue: string, numberValue: number): string {
  if (textValue.includes('year')) {
    return textValue.includes('s ')
      ? `${numberValue} anos atrás`
      : `${numberValue} ano atrás`;
  }
  else if (textValue.includes('month')) {
    return textValue.includes('s ')
      ? `${numberValue} meses atrás`
      : `${numberValue} mês atrás`;
  }
  else if (textValue.includes('day')) {
    return textValue.includes('s ')
      ? `${numberValue} dias atrás`
      : `${numberValue} dia atrás`;
  }
  else if (textValue.includes('hour')) {
    return textValue.includes('s ')
      ? `${numberValue} horas atrás`
      : `${numberValue} hora atrás`;
  }
  else if (textValue.includes('minute')) {
    return textValue.includes('s ')
      ? `${numberValue} minutos atrás`
      : `${numberValue} minuto atrás`;
  }
  else if (textValue.includes('second')) {
    return textValue.includes('s ')
      ? `${numberValue} segundos atrás`
      : `${numberValue} segundo atrás`;
  }

  return 'Momentos atrás';
}

/**
 * Translates a time left message from English to Brazilian Portuguese.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The translated message.
 */
function translateTimeLeftPtBr(textValue: string, numberValue: number): string {
  if (textValue.includes('year')) {
    return textValue.includes('s ')
      ? `${numberValue} anos restantes`
      : `${numberValue} ano restante`;
  }
  else if (textValue.includes('month')) {
    return textValue.includes('s ')
      ? `${numberValue} meses restantes`
      : `${numberValue} mês restante`;
  }
  else if (textValue.includes('day')) {
    return textValue.includes('s ')
      ? `${numberValue} dias restantes`
      : `${numberValue} dia restante`;
  }
  return textValue;
}

/**
 * Translates a server response message from English to brazilian Portuguese.
 *
 * @param {string} message The text message to be translated.
 * @returns The translated message.
 */
function translateServerResponsePtBr(message: string): string {
  switch (message) {
    case 'Bad password: Password must have at least at least 8 characters, 1 uppercase, 1 special character': {
      return 'Senha fraca: Senha deve possuir pelo menos 8 letras, 1 maiúscula, 1 caracter especial';
    }
    case 'Bad password: Password must have at least 1 uppercase, 1 special character': {
      return 'Senha fraca: Senha deve possuir pelo menos 1 maiúscula, 1 caracter especial';
    }
    case 'Bad password: Password must have at least 1 special character': {
      return 'Senha fraca: Senha deve possuir pelo menos 1 caracter especial';
    }
    case 'Email already exists!': {
      return 'E-mail já cadastrado!';
    }
    case 'Forbidden! Access denied!': {
      return 'Proibido! Acesso negado';
    }
    case 'Internal Server Error!': {
      return 'Erro Interno do Servidor!';
    }
    case 'Max login attempt limit reached. Please wait 30 minutes': {
      return 'Limite máximo de tentativas atingido. Por favor aguarde 30 minutos';
    }
    case 'Please fill in all the fields': {
      return 'Por ravor, preencha todos os campos';
    }
    case 'Please fill in your username and password!': {
      return 'Por favor, informe seu e-mail e senha!';
    }
    case 'Please type at least 3 characters': {
      return 'Por favor, digite pelo menos 3 letras';
    }
    case 'The maximum text length is 2000': {
      return 'O tamanho máximo do texto é 2000';
    }
    case 'Unknown error': {
      return 'Erro desconhecido';
    }
    case 'Wrong or missing information!': {
      return 'Informação errada ou incompleta!';
    }
    case 'Wrong user or password': {
      return 'E-mail ou senha inválidos!';
    }
    default: return message;
  }
}

export { translateTimeAgoPtBr, translateTimeLeftPtBr, translateServerResponsePtBr };
