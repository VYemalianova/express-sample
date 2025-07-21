import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../models/http-error';
import { IErrorResponse } from '../models/response';

export const errorHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof HttpError ? err.errorCode : 500;

  res.status(statusCode).json({
    success: false,
    errors: err instanceof HttpError ? err.errors : 'Internal Server Error',
  } as IErrorResponse);
};
