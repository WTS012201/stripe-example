import { Injectable } from "@nestjs/common";
import { FieldError } from "src/constants";
import { stripe } from "src/utils/stripe";
import { UserResponse } from "../user/user.dto";
import { PaymentSource } from "./payment.dto";

@Injectable()
export class PaymentService {
  constructor() {}

  async createSubscription({
    user,
    source,
  }: PaymentSource): Promise<UserResponse> {
    const customer = stripe.customers.create({
      email: user.email,
      plan: process.env.PLAN,
      source,
    });

    user.stripeId = customer.id;
    user.type = "paid";
    await user.save();

    return { user };
  }
}
