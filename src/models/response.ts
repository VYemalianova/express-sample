import { ValidationError } from 'express-validator';

export interface IResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface IErrorResponse {
  success: boolean;
  errors?: string | ValidationError[];
}
