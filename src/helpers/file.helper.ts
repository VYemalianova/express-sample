import path from 'path';
import fs from 'fs/promises';
import { HttpError } from '../models/http-error';

export const readJSONData = async <T>(fileName: string): Promise<T> => {
  const filePath = path.join('src', 'data', `${fileName}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf8');

    return JSON.parse(data) as T;
  } catch {
    throw new HttpError('Failed to read the file. It may not exist or is not accessible.', 500);
  }
};

export const writeJSONData = async <T>(fileName: string, data: T) => {
  const filePath = path.join('src', 'data', `${fileName}.json`);

  try {
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
  } catch {
    throw new HttpError('Failed to write file.', 500);
  }
};
