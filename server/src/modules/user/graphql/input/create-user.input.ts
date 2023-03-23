import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { EqualTo } from 'src/modules/shared/decorators/equal-to.decorator';
import { IsPassword } from 'src/modules/shared/decorators/is-password.decorator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsPassword()
  password: string;

  @Field()
  @IsPassword()
  @EqualTo('password', {
    message: 'confirmPassword must be equal to password',
  })
  confirmPassword: string;
}
