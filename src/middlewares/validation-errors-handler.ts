import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { IFieldValidationError } from '../models/response';
import { HttpError } from '../models/http-error';

export const validationErrorsHandler = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const formattedErrors: IFieldValidationError[] = result.array().map((error) => ({
    path: 'path' in error ? error.path : '',
    msg: 'msg' in error ? error.msg : '',
  }));

  console.log(formattedErrors);

  return next(new HttpError(400, formattedErrors));
};
