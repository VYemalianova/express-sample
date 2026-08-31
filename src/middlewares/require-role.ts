import { Request, Response, NextFunction } from 'express';
import { RoleType } from '../models/user.model';

export const requireRole = (allowedRoles: RoleType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user.role !== allowedRoles) {
      return res.status(403).json({ message: 'Forbidden: admin access required.' });
    }

    next();
  };
};
