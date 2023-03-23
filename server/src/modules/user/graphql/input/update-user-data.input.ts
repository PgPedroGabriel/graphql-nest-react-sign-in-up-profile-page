import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsEmail, ValidateIf } from 'class-validator';
import { EqualTo } from '../../../shared/decorators/equal-to.decorator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PickType(CreateUserInput, [
  'name',
] as const) {
  @Field({ nullable: true })
  @IsEmail()
  @ValidateIf((object, value) => {
    return !!value;
  })
  newEmail!: string | null;

  @Field({ nullable: true })
  @IsEmail()
  @EqualTo('newEmail', {
    message: 'confirmNewEmail must be equal to newEmail',
  })
  @ValidateIf((object, value) => {
    return !!value;
  })
  confirmNewEmail!: string | null;
}
