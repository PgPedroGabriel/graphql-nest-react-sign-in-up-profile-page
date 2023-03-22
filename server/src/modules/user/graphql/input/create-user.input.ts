import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check';

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
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [
    {
      mustContainLowerLetter: true,
      mustContainNumber: true,
      mustContainSpecialCharacter: true,
      mustContainUpperLetter: true,
    },
  ])
  password: string;

  @Field()
  @IsNotEmpty()
  confirm_password: string;
}
