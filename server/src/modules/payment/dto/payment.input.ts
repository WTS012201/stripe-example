import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaymentInput {
  @Field() source!: string;
  @Field() last4!: string;
}
