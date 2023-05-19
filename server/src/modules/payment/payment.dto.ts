import { Field, InputType } from "@nestjs/graphql";
import { User } from "../user/user.model";

@InputType()
export class PaymentSource {
  @Field() user!: User;
  @Field() source!: string;
}
