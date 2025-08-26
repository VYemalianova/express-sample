import { v4 as uuidv4 } from 'uuid';

import { readJSONData } from '../helpers/file.helper';
import { ISign } from '../models/sign.model';

export const loadSignsData = async (): Promise<ISign[]> => {
  const data = await readJSONData<ISign[]>('signs');

  return data.map((el: Partial<ISign>) => {
    return {
      ...el,
      id: el.id ?? uuidv4(),
    } as ISign;
  });
};
