import { readJSONData } from '../helpers/file.helper';
import { IUser } from '../models/user.model';

export const loadUsers = async (): Promise<IUser[]> => {
  return await readJSONData<IUser[]>('users');
};
