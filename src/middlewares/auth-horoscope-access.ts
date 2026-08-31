import { NextFunction, Request, Response } from 'express';
import { HoroscopeType } from '../models/horoscope.model';
import { authenticateJWT } from './auth-jwt';

export const authenticateHoroscopeAccess = (req: Request, res: Response, next: NextFunction) => {
  const horoscopeType = (req as any).horoscopeType as HoroscopeType;

  if (horoscopeType === HoroscopeType.daily || horoscopeType === HoroscopeType.love) {
    return next();
  }

  return authenticateJWT(req, res, next);
};
