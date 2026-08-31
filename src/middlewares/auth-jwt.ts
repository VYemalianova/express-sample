import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../utils/auth';
import { loadUsers } from '../services/auth.service';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    const users = await loadUsers();
    const user = users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
