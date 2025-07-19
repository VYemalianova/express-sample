import { ValidationError } from 'express-validator';

export class HttpError extends Error {
  errorCode: number;
  errors: string | ValidationError[];

  constructor(errors: string | ValidationError[], errorCode: number) {
    super();

    this.errorCode = errorCode;
    this.errors = errors;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
