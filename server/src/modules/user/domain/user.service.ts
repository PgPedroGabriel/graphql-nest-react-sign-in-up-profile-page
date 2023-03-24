import { IToken } from 'src/modules/auth/domain/auth.domain';
import { IUser } from './user.domain';

export interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
}

export interface IUserService {
  login(user: Pick<IUser, 'email' | 'password'>): Promise<IToken>;
  createUser(user: Omit<IUser, 'id'>): Promise<IUser>;
  updateUser(
    id: string,
    user: Pick<IUser, 'name'> & { newEmail?: string },
  ): Promise<IUser>;
  updatePassword(
    id: string,
    passwordChangeParams: IPasswordChange,
  ): Promise<void>;
  findUserByEmail(email: string): Promise<IUser>;
}
