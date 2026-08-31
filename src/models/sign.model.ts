export interface ISign {
  id: string;
  signType: SignType;
  planet: string;
  traits: string[];
  description: string;
  fact: string;
  element: Element;
  start: MonthDay;
  end: MonthDay;
}

export interface MonthDay {
  month: number;
  day: number;
}

export enum SignType {
  aries = 'aries',
  taurus = 'taurus',
  gemini = 'gemini',
  cancer = 'cancer',
  leo = 'leo',
  virgo = 'virgo',
  libra = 'libra',
  scorpio = 'scorpio',
  sagittarius = 'sagittarius',
  capricorn = 'capricorn',
  aquarius = 'aquarius',
  pisces = 'pisces',
}

export type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
