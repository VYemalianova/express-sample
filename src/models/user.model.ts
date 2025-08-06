export interface IUser {
  id: string;
  email: string;
  password: string;
  role: RoleType;
}

export enum RoleType {
  admin = 'admin',
  user = 'user',
}
