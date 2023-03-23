import { IUser } from './user.domain';

export interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
}

export interface IUserService {
  createUser(user: Omit<IUser, 'id'>): Promise<IUser>;
  updateUser(
    oldEmail: string,
    user: Pick<IUser, 'name'> & { newEmail?: string },
  ): Promise<IUser>;
  updatePassword(
    findEmail: string,
    passwordChangeParams: IPasswordChange,
  ): Promise<void>;
  findUserByEmail(email: string): Promise<IUser>;
}
