import { Field, ObjectType } from "@nestjs/graphql";
import { Errors, FieldError } from "src/constants";
import { User } from "../user.model";

@ObjectType({
  implements: () => [Errors],
})
export class UserResponse implements Errors {
  @Field(() => User, { nullable: true })
  user?: User;
  errors?: FieldError[];
}
