import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1h') as any;

export const generateToken = (payload: object, expiresIn = JWT_EXPIRES_IN): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
