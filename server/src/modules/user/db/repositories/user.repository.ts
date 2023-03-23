import { Injectable } from '@nestjs/common/decorators';
import { IRepository } from 'src/modules/shared/repositories/repository';
import { IUser } from '../../domain/user.domain';
import { UserEntity } from '../entities/user.entity';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class UserRepository implements IRepository<IUser> {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async get(id: string): Promise<IUser> {
    const user = await this.knex<UserEntity>('users').where('id', id).first();
    return user;
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.knex<UserEntity>('users')
      .where('email', email)
      .first();
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.knex('users').where('id', id).del();
    return;
  }

  async create(user: IUser): Promise<void> {
    await this.knex('users').insert(user);
    return;
  }

  async update(user: IUser): Promise<IUser> {
    await this.knex('users').where('id', user.id).update(user);
    return user;
  }
}
