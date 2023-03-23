import { IUser } from '../../domain/user.domain';

export class UserEntity implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.created_at = this.created_at ?? new Date();
    this.updated_at = this.updated_at ?? new Date();
  }
}
