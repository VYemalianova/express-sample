import { Router } from 'express';
import { body, param } from 'express-validator';

import { validateId } from '../helpers/validators.helper';
import { validationErrorsHandler } from '../middlewares/validation-errors-handler';
import { deleteUser, login, register } from '../controllers/auth.controller';

const router = Router();

const validateEmail = [
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email format.')
    .normalizeEmail(),
];

const validatePassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
];

router.post('/signup', [...validateEmail, ...validatePassword], validationErrorsHandler, register);
router.post('/signin', [...validateEmail, ...validatePassword], validationErrorsHandler, login);

router.delete(':id', [validateId(param, 'id')], validationErrorsHandler, deleteUser);

export default router;
