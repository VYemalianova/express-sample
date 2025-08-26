import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/http-error';
import { IResponse } from '../models/response';
import { ISign } from '../models/sign.model';
import { loadSignsData } from '../services/signs.service';

export const getSigns = async (
  req: Request,
  res: Response<IResponse<ISign[]>>,
  next: NextFunction
) => {
  try {
    const signsList = await loadSignsData();

    if (!signsList) {
      next(new HttpError('Not found.', 404));
    } else {
      res.json({
        success: true,
        message: 'Signs retrieved successfully.',
        data: signsList,
      });
    }
  } catch (error) {
    next(new HttpError('Internal server Error', 500));
  }
};
