import { IUser } from './user.domain';

export interface IUserService {
  createUser(user: Omit<IUser, 'id'>): Promise<IUser>;
}
