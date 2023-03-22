import { Injectable } from '@nestjs/common';
import { CryptoService } from '../../shared/services/crypto.service';
import { UserEntity } from '../db/entities/user.entity';
import { IUser } from '../domain/user.domain';
import { IUserService } from '../domain/user.service';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly cryptoService: CryptoService) {}

  async createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
    const entity = new UserEntity();

    entity.id = this.cryptoService.generateUUID();
    entity.name = user.name;
    entity.email = user.email;
    entity.password = await this.cryptoService.hashify(user.password);

    return entity;
  }
}
