import { describe, expect, it } from 'vitest';
import { translateTimeAgoPtBr, translateTimeLeftPtBr } from '../../utils/PortugueseUtils';
// import USER_LANG from '../../types/UserLangs';

describe('Portuguese Utils unit tests', () => {
  // const target = USER_LANG.PORTUGUESE;

  it('should translate all time ago messages', () => {
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

  it('should translate all time left messages', () => {
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
});