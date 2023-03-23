import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IUser } from '../../domain/user.domain';

@ObjectType()
export class PublicUserDataOutput {
  @Field(() => ID)
  id: string;

  @Field()
  name?: string;

  @Field()
  email?: string;

  static parseIUser(user: IUser): PublicUserDataOutput {
    const data = new PublicUserDataOutput();
    data.email = user.email;
    data.id = user.id;
    data.name = user.name;
    return data;
  }
}
