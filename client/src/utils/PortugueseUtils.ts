/**
 * Translates a time ago message from English to Brazilian Portuguese.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The message translated.
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
  else if (textValue.includes('days')) {
    return textValue.includes('s ')
      ? `${numberValue} dias atrás`
      : `${numberValue} dia atrás`;
  }
  else if (textValue.includes('hour')) {
    return textValue.includes('s ')
      ? `${numberValue} horas atrás`
      : `${numberValue} hora atrás`;
  }
  else if (textValue.includes('minutes')) {
    return textValue.includes('s ')
      ? `${numberValue} minutos atrás`
      : `${numberValue} minuto atrás`;
  }
  else if (textValue.includes('seconds')) {
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
 * @returns The message translated.
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

export { translateTimeAgoPtBr, translateTimeLeftPtBr };
