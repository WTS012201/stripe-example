import { Injectable } from "@nestjs/common";
import { FieldError } from "src/constants";
import { stripe } from "src/utils/stripe";
import { UserResponse } from "../user/dto/user.response";
import { User } from "../user/user.model";
import { SourceArgs } from "./dto/source.args";

@Injectable()
export class PaymentService {
  async createSubscription({
    user,
    source,
    last4,
  }: SourceArgs): Promise<UserResponse> {
    if (!user.stripeId) {
      const customer = await stripe.customers.create({
        email: user.email,
        source,
      });
      user.stripeId = customer.id;
    }

    stripe.subscriptions.create({
      customer: user.stripeId,
      items: [{ price: process.env.PLAN }],
    });

    user.type = "paid";
    user.last4 = last4;
    user = await user.save();

    return { user };
  }

  async changeCard({ user, source, last4 }: SourceArgs): Promise<UserResponse> {
    if (!user.stripeId || user.type !== "paid") {
      const error: FieldError = {
        message: "user has no card",
        field: "source",
      };
      return { errors: [error] };
    }

    user.last4 = last4;
    stripe.customers.update(user.stripeId, { source });
    user = await user.save();
    return { user };
  }

  async cancelSubscription(user: User): Promise<UserResponse> {
    if (user.type !== "paid") {
      const error: FieldError = {
        message: "user has no card",
        field: "source",
      };
      return { errors: [error] };
    }

    const { data } = await stripe.subscriptions.list({
      customer: user.stripeId,
    });

    const subPlan = data.find((val: any) => {
      return val.plan.id === process.env.PLAN;
    });

    await stripe.subscriptions.cancel(subPlan.id);
    user.type = "free-trial";
    user = await user.save();
    return { user };
  }
}
