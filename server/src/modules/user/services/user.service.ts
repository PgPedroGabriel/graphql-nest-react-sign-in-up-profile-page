import { Injectable } from '@nestjs/common';
import { CryptoService } from '../../shared/services/crypto.service';
import { UserEntity } from '../db/entities/user.entity';
import { UserRepository } from '../db/repositories/user.repository';
import { IUser } from '../domain/user.domain';
import { IPasswordChange, IUserService } from '../domain/user.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly repository: UserRepository,
  ) {}

  async updatePassword(
    findEmail: string,
    passwordChangeParams: IPasswordChange,
  ): Promise<void> {
    const entity = await this.repository.getByEmail(findEmail);
    if (!entity) {
      throw new Error('Email does not exists');
    }

    const assertOldPassword = await this.cryptoService.assertHash(
      passwordChangeParams.oldPassword,
      entity.password,
    );

    if (!assertOldPassword) {
      throw new Error('Invalid old password');
    }

    entity.password = await this.cryptoService.hashify(
      passwordChangeParams.newPassword,
    );
    await this.repository.update(entity);
  }

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

    await this.repository.create(entity);

    return entity;
  }

  async updateUser(
    oldEmail: string,
    user: Pick<IUser, 'name'> & { newEmail?: string },
  ): Promise<IUser> {
    const entity = await this.repository.getByEmail(oldEmail);
    if (!entity) {
      throw new Error('Email does not exists');
    }

    if (user.newEmail) {
      const validate = await this.repository.getByEmail(user.newEmail);
      if (validate && validate.id !== entity.id) {
        throw new Error('Email unavailable to pick');
      }
    }

    entity.name = user.name;
    entity.email = user.newEmail ?? entity.email;
    await this.repository.update(entity);

    return entity;
  }
}
