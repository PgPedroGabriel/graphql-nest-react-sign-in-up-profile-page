import { Injectable } from '@nestjs/common';
import { CryptoService } from '../../shared/services/crypto.service';
import { UserEntity } from '../db/entities/user.entity';
import { UserRepository } from '../db/repositories/user.repository';
import { IUser } from '../domain/user.domain';
import { IUserService } from '../domain/user.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly repository: UserRepository,
  ) {}

  async findUserByEmail(email: string): Promise<IUser> {
    const entity = await this.repository.getByEmail(email);
    if (!entity) {
      throw new Error('Email does not exists');
    }

    return entity;
  }

  async createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
    if (await this.repository.getByEmail(user.email)) {
      throw new Error('Email already exists');
    }

    const entity = new UserEntity();

    entity.id = this.cryptoService.generateUUID();
    entity.name = user.name;
    entity.email = user.email;
    entity.password = await this.cryptoService.hashify(user.password);

    this.repository.save(entity);

    return entity;
  }

  async updateUser(
    oldEmail: string,
    user: Pick<IUser, 'email' | 'name'>,
  ): Promise<IUser> {
    const entity = await this.repository.getByEmail(oldEmail);
    if (!entity) {
      throw new Error('Email does not exists');
    }
    entity.name = user.name;
    entity.email = user.email ?? entity.email;
    this.repository.update(entity);
    return entity;
  }
}
