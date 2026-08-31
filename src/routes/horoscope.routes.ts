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
import { authenticateHoroscopeAccess } from '../middlewares/auth-horoscope-access';
import { authenticateJWT } from '../middlewares/auth-jwt';
import { requireRole } from '../middlewares/require-role';
import { RoleType } from '../models/user.model';

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
  authenticateHoroscopeAccess,
  getHoroscope
);
router.post(
  '',
  [...baseValidation(body), notEmptyField(body, 'description')],
  validationErrorsHandler,
  authenticateJWT,
  requireRole(RoleType.admin),
  addHoroscope
);
router.put(
  '',
  [...baseValidation(body), notEmptyField(body, 'description'), validateId(body, 'id')],
  validationErrorsHandler,
  authenticateJWT,
  requireRole(RoleType.admin),
  updateHoroscope
);
router.delete(
  '/:id',
  [validateId(param, 'id')],
  validationErrorsHandler,
  authenticateJWT,
  requireRole(RoleType.admin),
  deleteHoroscope
);

export default router;
