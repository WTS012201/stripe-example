import { Field, InputType } from "@nestjs/graphql";
import { User } from "src/modules/user/user.model";

@InputType()
export class SourceArgs {
  @Field() user!: User;
  @Field() source!: string;
  @Field() last4!: string;
}
