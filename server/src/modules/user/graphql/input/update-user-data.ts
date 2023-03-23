import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsEmail, ValidateIf } from 'class-validator';
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
  email!: string | null;
}
