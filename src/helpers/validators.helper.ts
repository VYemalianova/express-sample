import { body, param, query, ValidationChain } from 'express-validator';

export type FieldSource = typeof param | typeof body | typeof query;

export const isInEnum = (
  fieldSource: FieldSource,
  fieldName: string,
  values: string[] | number[]
): ValidationChain =>
  fieldSource(fieldName).isIn(values).withMessage(`Unsupported ${fieldName} value.`);

export const isISODate = (fieldSource: FieldSource, fieldName: string): ValidationChain =>
  fieldSource(fieldName).isISO8601().withMessage(`${fieldName} must be in ISO8601 format.`);

export const notEmptyField = (fieldSource: FieldSource, fieldName: string): ValidationChain =>
  fieldSource(fieldName).notEmpty().withMessage(`${fieldName} not specified.`);

export const validateId = (fieldSource: FieldSource, fieldName: string): ValidationChain =>
  fieldSource(fieldName).isUUID('4').withMessage('Invalid UUIDv4.');
