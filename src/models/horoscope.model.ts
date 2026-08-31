import { SignType } from './sign.model';

export enum HoroscopeType {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
  career = 'career',
  finance = 'finance',
  health = 'health',
  love = 'love',
}

export interface IHoroscope {
  id: string;
  horoscopeType: HoroscopeType;
  signType: SignType;
  description: string;
  startDate: string;
  endDate: string;
}
