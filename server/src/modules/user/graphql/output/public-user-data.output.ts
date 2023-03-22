import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PublicUserDataOutput {
  @Field(() => ID)
  id: string;

  @Field()
  name?: string;

  @Field()
  email?: string;
}
