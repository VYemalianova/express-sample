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
      next(new HttpError(404, 'Not found.'));
    } else {
      res.json({
        success: true,
        message: 'Signs retrieved successfully.',
        data: signsList,
      });
    }
  } catch (error) {
    next(new HttpError(500, 'Internal server Error'));
  }
};

export const getSignByType = async (
  req: Request,
  res: Response<IResponse<ISign>>,
  next: NextFunction
) => {
  try {
    const { signType } = req.params;
    const signsList = await loadSignsData();
    const sign = signsList.find((sign) => sign.signType === signType);

    if (!sign) {
      next(new HttpError(404, 'Not found.'));
    } else {
      res.json({
        success: true,
        message: 'Sign retrieved successfully.',
        data: sign,
      });
    }
  } catch (error) {
    next(new HttpError(500, 'Internal server Error'));
  }
};
