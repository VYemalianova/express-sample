import { Router } from 'express';
import { param } from 'express-validator';

import { getSignByType, getSigns } from '../controllers/signs.controller';
import { isInEnum } from '../helpers/validators.helper';
import { SignType } from '../models/sign.model';
import { validationErrorsHandler } from '../middlewares/validation-errors-handler';

const router = Router();

router.get('', getSigns);
router.get(
  '/:signType',
  [isInEnum(param, 'signType', Object.values(SignType))],
  validationErrorsHandler,
  getSignByType
);

export default router;
