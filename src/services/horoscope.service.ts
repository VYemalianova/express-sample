import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { HoroscopeType, IHoroscope } from '../models/horoscope.model';
import { readJSONData } from '../helpers/file.helper';

dayjs.extend(isoWeek);

const DATE_FORMAT = 'YYYY-MM-DD';

export const loadHoroscopeData = async (
  startDate?: string,
  endDate?: string
): Promise<IHoroscope[]> => {
  const data = await readJSONData<IHoroscope[]>('horoscopes');

  return data.map((el: Partial<IHoroscope>) => {
    return {
      ...el,
      id: el.id ?? uuidv4(),
      startDate: el.startDate ?? startDate,
      endDate: el.endDate ?? endDate,
    } as IHoroscope;
  });
};

export const getHoroscopeDateRange = (
  type: HoroscopeType
): { startDate: string; endDate: string } => {
  const today = dayjs();

  let startDate = today;
  let endDate = today;

  switch (type) {
    case HoroscopeType.weekly: {
      startDate = today.startOf('isoWeek');
      endDate = today.endOf('isoWeek');

      break;
    }

    case HoroscopeType.monthly: {
      startDate = today.startOf('month');
      endDate = today.endOf('month');

      break;
    }

    case HoroscopeType.yearly: {
      startDate = today.startOf('year');
      endDate = today.endOf('year');

      break;
    }

    default:
      break;
  }

  return {
    startDate: startDate.format(DATE_FORMAT),
    endDate: endDate.format(DATE_FORMAT),
  };
};

export const formatDate = (date: string): string => {
  return dayjs(date).format(DATE_FORMAT);
};
