import { ValidationError } from 'express-validator';
import { IFieldError } from './response';

export class HttpError extends Error {
  errorCode: number;
  errors: string | IFieldError[];

  constructor(errors: string | IFieldError[], errorCode: number) {
    super();

    this.errorCode = errorCode;
    this.errors = errors;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
