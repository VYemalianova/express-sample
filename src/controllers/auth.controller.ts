import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { HttpError } from '../models/http-error';
import { writeJSONData } from '../helpers/file.helper';
import { IResponse } from '../models/response';
import { IUser, RoleType } from '../models/user.model';
import { loadUsers } from '../services/auth.service';
import { generateToken } from '../utils/auth';

export const register = async (
  req: Request,
  res: Response<IResponse<{ token: string; user: Partial<IUser> }>>,
  next: NextFunction
) => {
  try {
    const body = req.body as Partial<IUser>;
    const users = await loadUsers();
    const existingUser = users.find((user) => user.email === body.email);

    if (existingUser) {
      return next(new HttpError(409, 'User with this email already exists.'));
    }

    const hashedPassword = await bcrypt.hash(body.password!, 12);
    const newUser = {
      id: uuidv4(),
      email: body.email,
      password: hashedPassword,
      role: body.role ?? RoleType.user,
    } as IUser;
    users.push(newUser);

    await writeJSONData<IUser[]>('users', users);

    const token = generateToken({ id: newUser.id, email: newUser.email });
    const { password, ...user } = newUser;

    res.status(201).json({ success: true, message: '', data: { token, user } });
  } catch (error) {
    next(new HttpError(500, 'Something went wrong during signup.'));
  }
};

export const login = async (
  req: Request,
  res: Response<IResponse<{ token: string; user: Partial<IUser> }>>,
  next: NextFunction
) => {
  try {
    const body = req.body as Partial<IUser>;
    const users = await loadUsers();
    const existingUser = users.find((user) => user.email === body.email);

    if (!existingUser) {
      return next(new HttpError(401, 'User does not exists.'));
    }

    const isPasswordValid = await bcrypt.compare(body.password!, existingUser.password);

    if (!isPasswordValid) {
      return next(new HttpError(401, 'Invalid password.'));
    }

    const token = generateToken({ id: existingUser.id, email: existingUser.email });
    const { password, ...user } = existingUser;

    res.json({ success: true, message: '', data: { token, user } });
  } catch {
    next(new HttpError(500, 'Something went wrong during login.'));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response<IResponse<number>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (user.id !== id && user.role !== 'admin') {
      return next(new HttpError(403, 'You can only delete your own account.'));
    }

    const users = await loadUsers();
    const updatedUsersList = users.filter((user) => user.id !== id);

    await writeJSONData<IUser[]>('users', updatedUsersList);

    res.status(204).json({ success: true, message: 'User deleted successfully.', data: 1 });
  } catch {
    next(new HttpError(500, 'Failed to delete user.'));
  }
};
