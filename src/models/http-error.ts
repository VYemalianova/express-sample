import { IFieldValidationError } from './response';

export class HttpError extends Error {
  statusCode: number;
  errors: string | IFieldValidationError[];

  constructor(statusCode: number, errors: string | IFieldValidationError[]) {
    super();

    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
