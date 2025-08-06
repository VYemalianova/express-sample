import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { HoroscopeType, IHoroscope } from '../models/horoscope.model';
import { readJSONData } from '../helpers/file.helper';

dayjs.extend(isoWeek);

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
      endDate: el.startDate ?? endDate,
    } as IHoroscope;
  });
};

export const getHoroscopeDateRange = (
  type: HoroscopeType
): { startDate: string; endDate: string } => {
  const today = dayjs();

  let dateRange: { startDate: Date; endDate: Date };

  switch (type) {
    case HoroscopeType.weekly: {
      const monday = today.startOf('isoWeek').toDate();
      const sunday = today.endOf('isoWeek').toDate();
      console.log(monday, sunday);
      dateRange = {
        startDate: monday,
        endDate: sunday,
      };
      break;
    }

    case HoroscopeType.monthly: {
      const firstDay = today.startOf('month').toDate();
      const lastDay = today.endOf('month').toDate();
      dateRange = {
        startDate: firstDay,
        endDate: lastDay,
      };
      break;
    }

    case HoroscopeType.yearly: {
      const firstDay = today.startOf('year').toDate();
      const lastDay = today.endOf('year').toDate();
      dateRange = {
        startDate: firstDay,
        endDate: lastDay,
      };
      break;
    }

    case HoroscopeType.daily:
    case HoroscopeType.love:
    default:
      dateRange = {
        startDate: today.toDate(),
        endDate: today.toDate(),
      };
      break;
  }

  return {
    startDate: dateRange.startDate.toISOString(),
    endDate: dateRange.endDate.toISOString(),
  };
};
