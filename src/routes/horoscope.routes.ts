import { Router } from 'express';

import {
  addHoroscope,
  deleteHoroscope,
  getHoroscope,
  updateHoroscope,
} from '../controllers/horoscope.controller';
import { body, param, query, ValidationChain } from 'express-validator';
import { SignType } from '../models/sign.model';
import { HoroscopeType } from '../models/horoscope.model';
import {
  FieldSource,
  isInEnum,
  isISODate,
  notEmptyField,
  validateId,
} from '../helpers/validators.helper';
import { validationErrorsHandler } from '../middlewares/validation-errors-handler';

const router = Router();

const baseValidation = (fieldSource: FieldSource): ValidationChain[] => {
  return [
    isInEnum(fieldSource, 'horoscopeType', Object.values(HoroscopeType)),
    isInEnum(fieldSource, 'signType', Object.values(SignType)),
    isISODate(fieldSource, 'startDate'),
    isISODate(fieldSource, 'endDate'),
  ];
};

router.get(
  '',
  [
    isInEnum(query, 'horoscopeType', Object.values(HoroscopeType)),
    isInEnum(query, 'signType', Object.values(SignType)),
    isISODate(query, 'startDate').optional(),
    isISODate(query, 'endDate').optional(),
  ],
  validationErrorsHandler,
  getHoroscope
);
router.post(
  '',
  [...baseValidation(body), notEmptyField(body, 'description')],
  validationErrorsHandler,
  addHoroscope
);
router.put(
  '',
  [...baseValidation(body), notEmptyField(body, 'description'), validateId(body, 'id')],
  validationErrorsHandler,
  updateHoroscope
);
router.delete(':id', [validateId(param, 'id')], validationErrorsHandler, deleteHoroscope);

export default router;
