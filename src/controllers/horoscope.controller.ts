import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { HoroscopeType, IHoroscope } from '../models/horoscope.model';
import { HttpError } from '../models/http-error';
import { readJSONData, writeJSONData } from '../helpers/file.helper';
import { IResponse } from '../models/response';
import { getHoroscopeDateRange, loadHoroscopeData } from '../services/horoscope.service';

export const getHoroscope = async (
  req: Request,
  res: Response<IResponse<IHoroscope>>,
  next: NextFunction
) => {
  try {
    const { horoscopeType, signType } = req.query;
    const horoscopeDateRange = getHoroscopeDateRange(horoscopeType as HoroscopeType);

    const startDate = req.query.startDate
      ? new Date(req.query.startDate as string).toISOString()
      : horoscopeDateRange.startDate;
    const endDate = req.query.endDate
      ? new Date(req.query.endDate as string).toISOString()
      : horoscopeDateRange.endDate;

    const horoscopeList = await loadHoroscopeData(startDate, endDate);
    const horoscope = horoscopeList.find(
      (el) =>
        el.horoscopeType === horoscopeType &&
        el.signType === signType &&
        el.startDate === startDate &&
        el.endDate === endDate
    );

    if (!horoscope) {
      next(new HttpError('Not found.', 404));
    } else {
      res.json({
        success: true,
        message: 'Horoscope retrieved successfully.',
        data: horoscope,
      });
    }
  } catch (error) {
    next(new HttpError('Internal server Error', 500));
  }
};

export const addHoroscope = async (
  req: Request,
  res: Response<IResponse<IHoroscope>>,
  next: NextFunction
) => {
  try {
    const body = req.body as Partial<IHoroscope>;
    const horoscopes = (await readJSONData<IHoroscope[]>('horoscopes')) as IHoroscope[];
    const { startDate, endDate } = getHoroscopeDateRange(body.horoscopeType as HoroscopeType);
    const newHoroscope = {
      ...body,
      id: uuidv4(),
      startDate: body.startDate ? new Date(body.startDate).toISOString() : startDate,
      endDate: body.endDate ? new Date(body.endDate).toISOString() : endDate,
    } as IHoroscope;

    horoscopes.push(newHoroscope);

    await writeJSONData<IHoroscope[]>('horoscopes', horoscopes);

    res.status(201).json({
      success: true,
      message: 'Horoscope added successfully.',
      data: newHoroscope,
    });
  } catch {
    next(new HttpError('Failed to add horoscope.', 500));
  }
};

export const updateHoroscope = async (
  req: Request,
  res: Response<IResponse<IHoroscope>>,
  next: NextFunction
) => {
  try {
    const body = req.body as Partial<IHoroscope>;
    const horoscopes = (await readJSONData<IHoroscope[]>('horoscopes')) as IHoroscope[];
    const { startDate, endDate } = getHoroscopeDateRange(body.horoscopeType as HoroscopeType);
    const horoscopeToUpdate = {
      ...body,
      startDate: body.startDate ? new Date(body.startDate).toISOString() : startDate,
      endDate: body.endDate ? new Date(body.endDate).toISOString() : endDate,
    } as IHoroscope;

    const updatedHoroscopes = horoscopes.map((el) => {
      if (el.id === horoscopeToUpdate.id) {
        return horoscopeToUpdate;
      }

      return el;
    });

    await writeJSONData<IHoroscope[]>('horoscopes', updatedHoroscopes);

    res.json({
      success: true,
      message: 'Horoscope updated successfully.',
      data: horoscopeToUpdate,
    });
  } catch {
    next(new HttpError('Failed to update horoscope.', 500));
  }
};

export const deleteHoroscope = async (
  req: Request,
  res: Response<IResponse<number>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const horoscopes = (await readJSONData<IHoroscope[]>('horoscopes')) as IHoroscope[];
    const updatedHoroscopeList = horoscopes.filter((el) => el.id !== id);

    await writeJSONData<IHoroscope[]>('horoscopes', updatedHoroscopeList);

    res.status(204).json({ success: true, message: 'Horoscope deleted successfully.', data: 1 });
  } catch {
    next(new HttpError('Failed to update horoscope.', 500));
  }
};
