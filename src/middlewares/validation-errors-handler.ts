import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { IFieldError } from '../models/response';
import { HttpError } from '../models/http-error';

export const validationErrorsHandler = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const formattedErrors: IFieldError[] = result.array().map((error) => ({
    path: 'path' in error ? error.path : '',
    msg: 'msg' in error ? error.msg : '',
  }));

  console.log(formattedErrors);

  return next(new HttpError(formattedErrors, 400));
};
