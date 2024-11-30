/**
 * Translates a time ago message from English to Spanish.
 *
 * @param {string} textValue The text message to be translated.
 * @param {number} numberValue The number value to be used in the message.
 * @returns The message translated.
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
 * @returns The message translated.
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

export { translateTimeAgoEs, translateTimeLeftEs };
