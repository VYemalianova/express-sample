import { v4 as uuidv4 } from 'uuid';

import { readJSONData } from '../helpers/file.helper';
import { IUser } from '../models/user.model';

export const loadUsers = async (): Promise<IUser[]> => {
  const data = await readJSONData<IUser[]>('users');

  return data.map((el: Partial<IUser>) => {
    return {
      ...el,
      id: el.id ?? uuidv4(),
    } as IUser;
  });
};
