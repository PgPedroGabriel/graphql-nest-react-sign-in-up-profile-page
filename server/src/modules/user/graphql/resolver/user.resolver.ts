import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PublicUserDataOutput } from '../output/public-user-data.output';
import { CreateUserInput } from '../input/create-user.input';
import { IUserService } from '../../domain/user.service';
import { Inject } from '@nestjs/common';
import { BadRequestException } from 'src/modules/shared/exceptions/bad-request.exception';
import { UpdateUserInput } from '../input/update-user-data';

@Resolver()
export class UserResolver {
  constructor(
    @Inject('USER_SERVICE_TOKEN') private readonly service: IUserService,
  ) {}

  @Query(() => PublicUserDataOutput)
  async user(@Args('email') email: string): Promise<PublicUserDataOutput> {
    try {
      const user = await this.service.findUserByEmail(email);
      return PublicUserDataOutput.parseIUser(user);
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }

  @Mutation(() => PublicUserDataOutput)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    if (createUserInput.confirm_password !== createUserInput.password)
      BadRequestException.throw('confirm_password must be same of password');

    try {
      const user = await this.service.createUser(createUserInput);
      return PublicUserDataOutput.parseIUser(user);
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }

  @Mutation(() => PublicUserDataOutput)
  async updateUser(
    @Args('findEmail') findEmail: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    try {
      const user = await this.service.updateUser(findEmail, updateUserInput);
      return PublicUserDataOutput.parseIUser(user);
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }
}
