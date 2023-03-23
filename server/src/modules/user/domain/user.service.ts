import { IUser } from './user.domain';

export interface IUserService {
  createUser(user: Omit<IUser, 'id'>): Promise<IUser>;
  updateUser(email: string, user: Pick<IUser, 'name'>): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser>;
}
