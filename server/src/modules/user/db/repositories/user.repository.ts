import { IUser } from '../../domain/user.domain';

export interface IUserRepository {
  get(id: string): Promise<IUser>;
  delete(id: string): Promise<void>;
  save(user: IUser): Promise<void>;
  update(user: IUser): Promise<IUser>;
}
