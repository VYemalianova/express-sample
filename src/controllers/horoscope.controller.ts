import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { HoroscopeType, IHoroscope } from '../models/horoscope.model';
import { HttpError } from '../models/http-error';
import { readJSONData, writeJSONData } from '../helpers/file.helper';
import { IResponse } from '../models/response';
import {
  formatDate,
  getHoroscopeDateRange,
  loadHoroscopeData,
} from '../services/horoscope.service';

export const getHoroscope = async (
  req: Request,
  res: Response<IResponse<IHoroscope>>,
  next: NextFunction
) => {
  try {
    const { horoscopeType, signType, startDate, endDate } = req.query;

    const dateRange = getHoroscopeDateRange(horoscopeType as HoroscopeType);
    const requestedStartDate = startDate ? formatDate(startDate as string) : dateRange.startDate;
    const requestedEndDate = endDate ? formatDate(endDate as string) : dateRange.endDate;

    const horoscopeList = await loadHoroscopeData(requestedStartDate, requestedEndDate);

    const horoscope = horoscopeList.find(
      (el) =>
        el.horoscopeType === horoscopeType &&
        el.signType === signType &&
        el.startDate === requestedStartDate &&
        el.endDate === requestedEndDate
    );

    if (!horoscope) {
      return next(new HttpError('Not found.', 404));
    }

    res.json({
      success: true,
      message: 'Horoscope retrieved successfully.',
      data: horoscope,
    });
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
    const horoscopes = await loadHoroscopeData();
    const { startDate, endDate } = getHoroscopeDateRange(body.horoscopeType as HoroscopeType);
    const newHoroscope = {
      ...body,
      id: uuidv4(),
      startDate: body.startDate ? formatDate(body.startDate) : startDate,
      endDate: body.endDate ? formatDate(body.endDate) : endDate,
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
    const horoscopes = await loadHoroscopeData();

    const existingHoroscope = horoscopes.find((el) => el.id === body.id);

    if (!existingHoroscope) {
      return next(new HttpError('Horoscope not found.', 404));
    }

    const { startDate, endDate } = getHoroscopeDateRange(body.horoscopeType as HoroscopeType);
    const horoscopeToUpdate = {
      ...body,
      startDate: body.startDate ? formatDate(body.startDate) : startDate,
      endDate: body.endDate ? formatDate(body.endDate) : endDate,
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
    next(new HttpError('Failed to delete horoscope.', 500));
  }
};
