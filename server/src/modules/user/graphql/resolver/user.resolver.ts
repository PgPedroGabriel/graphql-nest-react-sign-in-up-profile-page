import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PublicUserDataOutput } from '../output/public-user-data.output';
import { randomUUID } from 'crypto';
import { CreateUserInput } from '../input/create-user.input';
import { IUserService } from '../../domain/user.service';
import { Inject } from '@nestjs/common';
import { BadRequestException } from 'src/modules/shared/exceptions/bad-request.exception';

const users = [
  {
    id: randomUUID(),
    email: 'test@test.com',
    name: 'Test User',
  } as PublicUserDataOutput,
  {
    id: randomUUID(),
    email: 'devpedrogabriel@gmail.com',
    name: 'Test User 2',
  } as PublicUserDataOutput,
];

@Resolver()
export class UserResolver {
  constructor(
    @Inject('USER_SERVICE_TOKEN') private readonly service: IUserService,
  ) {}

  @Query(() => PublicUserDataOutput)
  async user() {
    return users[0];
  }

  @Mutation(() => PublicUserDataOutput)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    if (createUserInput.confirm_password !== createUserInput.password)
      BadRequestException.throw('confirm_password must be same of password');

    const user = await this.service.createUser(createUserInput);

    const data = new PublicUserDataOutput();
    data.email = user.email;
    data.id = user.id;
    data.name = user.name;
    return data;
  }
}
