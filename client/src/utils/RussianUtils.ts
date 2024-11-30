function translateTimeAgoRu(textValue: string, numberValue: number): string {
  if (textValue.includes('year')) {
    return textValue.includes('s ')
      ? `${numberValue} года назад`
      : `${numberValue} год назад`;
  }
  else if (textValue.includes('month')) {
    return textValue.includes('s ')
      ? `${numberValue} месяца назад`
      : `${numberValue} месяц назад`;
  }
  else if (textValue.includes('days')) {
    return textValue.includes('s ')
      ? `${numberValue} дня назад`
      : `${numberValue} день назад`;
  }
  else if (textValue.includes('hour')) {
    return textValue.includes('s ')
      ? `${numberValue} часа назад`
      : `${numberValue} час назад`;
  }
  else if (textValue.includes('minutes')) {
    return textValue.includes('s ')
      ? `${numberValue} минуты назад`
      : `${numberValue} минуту назад`;
  }
  else if (textValue.includes('seconds')) {
    return textValue.includes('s ')
      ? `${numberValue} секунд назад`
      : `${numberValue} секунду назад`;
  }

  return 'Несколько минут назад';
}

export { translateTimeAgoRu };
