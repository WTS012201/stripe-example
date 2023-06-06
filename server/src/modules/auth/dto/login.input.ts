import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @Length(3, 16)
  username!: string;

  @Length(6, 64)
  @Field()
  password!: string;
}
