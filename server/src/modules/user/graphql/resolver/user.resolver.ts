import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PublicUserDataOutput } from '../output/public-user-data.output';
import { CreateUserInput } from '../input/create-user.input';
import { IUserService } from '../../domain/user.service';
import { Inject, UseGuards } from '@nestjs/common';
import { BadRequestException } from 'src/modules/shared/exceptions/bad-request.exception';
import { UpdateUserInput } from '../input/update-user-data.input';
import { UpdateUserPasswordInput } from '../input/update-user-password.input';
import { LoginUserInput } from '../input/login-user.input';
import { LoginUserOutput } from '../output/login-user.output';
import { GqlJwtAuthGuard } from '../../../auth/graphql/guards/graphql.jwt.auth.guard';
import { CurrentUser } from 'src/modules/auth/graphql/decorators/current-user.decorator';
import { IUser } from '../../domain/user.domain';

@Resolver()
export class UserResolver {
  constructor(
    @Inject('USER_SERVICE_TOKEN') private readonly service: IUserService,
  ) {}

  @Query(() => PublicUserDataOutput)
  @UseGuards(GqlJwtAuthGuard)
  async user(@CurrentUser() auth: IUser): Promise<PublicUserDataOutput> {
    try {
      const user = await this.service.findUserById(auth.id);
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
  @UseGuards(GqlJwtAuthGuard)
  async updateUser(
    @CurrentUser() auth: IUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    try {
      const user = await this.service.updateUser(auth.id, updateUserInput);
      return PublicUserDataOutput.parseIUser(user);
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }

  @Mutation(() => String)
  @UseGuards(GqlJwtAuthGuard)
  async updateUserPassword(
    @CurrentUser() auth: IUser,
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
  ) {
    try {
      await this.service.updatePassword(auth.id, updateUserPasswordInput);
      return 'ok';
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }

  @Mutation(() => LoginUserOutput)
  async doLogin(
    @Args('loginUserInput')
    loginUserInput: LoginUserInput,
  ) {
    try {
      return await this.service.login(loginUserInput);
    } catch (e) {
      BadRequestException.throw(e.message);
    }
  }
}
