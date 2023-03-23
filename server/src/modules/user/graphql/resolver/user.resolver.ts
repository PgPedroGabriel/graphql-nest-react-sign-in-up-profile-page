import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PublicUserDataOutput } from '../output/public-user-data.output';
import { CreateUserInput } from '../input/create-user.input';
import { IUserService } from '../../domain/user.service';
import { Inject } from '@nestjs/common';
import { BadRequestException } from 'src/modules/shared/exceptions/bad-request.exception';
import { UpdateUserInput } from '../input/update-user-data';
import { UpdateUserPasswordInput } from '../input/update-user-password';

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
    try {
      const user = await this.service.createUser(createUserInput);
      return PublicUserDataOutput.parseIUser(user);
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }

  @Mutation(() => PublicUserDataOutput)
  async updateUser(
    @Args('oldEmail') oldEmail: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const { name, newEmail, confirmNewEmail } = updateUserInput;
    if (newEmail && newEmail !== confirmNewEmail) {
      BadRequestException.throw('incorrect confirmation from new email');
    }

    try {
      const user = await this.service.updateUser(oldEmail, {
        name,
        newEmail,
      });
      return PublicUserDataOutput.parseIUser(user);
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }

  @Mutation(() => String)
  async updateUserPassword(
    @Args('findEmail') findEmail: string,
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
  ) {
    try {
      await this.service.updatePassword(findEmail, updateUserPasswordInput);
      return 'ok';
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }
}
