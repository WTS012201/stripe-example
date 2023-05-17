import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Errors, FieldError } from "src/constants";
import { User } from "./user.model";

@InputType()
export class Credentials {
  @Field() username!: string;
  @Field() password!: string;
  @Field() email!: string;
}

@InputType()
export class LoginCredentials {
  @Field() username!: string;
  @Field() password!: string;
}

@ObjectType({
  implements: () => [Errors],
})
export class UserResponse implements Errors {
  @Field(() => User, { nullable: true })
  user?: User;
  errors?: FieldError[];
}
