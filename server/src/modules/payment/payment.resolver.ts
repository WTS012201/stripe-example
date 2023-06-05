import { Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { Ctx } from "src/constants";
import { UserAuthGuard } from "../auth/auth.guard";
import { UserResponse } from "../user/dto/user.response";
import { PaymentService } from "./payment.service";

@Resolver()
export class PaymentResolver {
  constructor(@Inject(PaymentService) private paymentService: PaymentService) {}

  @Mutation(() => UserResponse)
  @UseGuards(UserAuthGuard)
  async createSubscription(
    @Args("source", { type: () => String }) source: string,
    @Args("last4", { type: () => String }) last4: string,
    @Context() { req }: Ctx
  ): Promise<UserResponse> {
    const res = await this.paymentService.createSubscription({
      user: req.user,
      source,
      last4,
    });

    return res;
  }

  @Mutation(() => UserResponse)
  @UseGuards(UserAuthGuard)
  async changeCard(
    @Args("source", { type: () => String }) source: string,
    @Args("last4", { type: () => String }) last4: string,
    @Context() { req }: Ctx
  ): Promise<UserResponse> {
    const res = await this.paymentService.changeCard({
      user: req.user,
      source,
      last4,
    });

    return res;
  }

  @Mutation(() => UserResponse)
  @UseGuards(UserAuthGuard)
  async cancelSubscription(@Context() { req }: Ctx): Promise<UserResponse> {
    const res = await this.paymentService.cancelSubscription(req.user);
    return res;
  }
}
