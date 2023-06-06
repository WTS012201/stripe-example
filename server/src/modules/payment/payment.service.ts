import { Injectable } from "@nestjs/common";
import { FieldError, FieldErrorMessage } from "src/constants";
import { stripe } from "src/utils/stripe";
import { User } from "../user/user.model";
import { PaymentInput } from "./dto/payment.input";

@Injectable()
export class PaymentService {
  async createSubscription(
    { source, last4 }: PaymentInput,
    user: User
  ): Promise<User> {
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

    return user;
  }

  async changeCard({ source, last4 }: PaymentInput, user: User): Promise<User> {
    if (!user.stripeId || user.type !== "paid") {
      const error: FieldErrorMessage = {
        message: "user has no card",
        field: "source",
      };
      throw new FieldError(error);
    }

    user.last4 = last4;
    stripe.customers.update(user.stripeId, { source });
    user = await user.save();
    return user;
  }

  async cancelSubscription(user: User): Promise<User> {
    if (user.type !== "paid") {
      const error: FieldErrorMessage = {
        message: "user has no card",
        field: "source",
      };
      throw new FieldError(error);
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
    return user;
  }
}
