import { Field, InputType } from '@nestjs/graphql';
import { EqualTo } from '../../../shared/decorators/equal-to.decorator';
import { IsPassword } from '../../../shared/decorators/is-password.decorator';

@InputType()
export class UpdateUserPasswordInput {
  @Field()
  @IsPassword()
  oldPassword: string;

  @Field()
  @IsPassword()
  newPassword: string;

  @Field()
  @IsPassword()
  @EqualTo('newPassword', {
    message: 'confirmPassword must be equal to newPassword',
  })
  confirmNewPassword: string;
}
