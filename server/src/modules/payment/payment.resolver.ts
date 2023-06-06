import { Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { Ctx } from "src/constants";
import { UserAuthGuard } from "../auth/auth.guard";
import { User } from "../user/user.model";
import { PaymentInput } from "./dto/payment.input";
import { PaymentService } from "./payment.service";

@Resolver()
export class PaymentResolver {
  constructor(@Inject(PaymentService) private paymentService: PaymentService) {}

  @Mutation(() => User)
  @UseGuards(UserAuthGuard)
  async createSubscription(
    @Args("source") source: PaymentInput,
    @Context() { req }: Ctx
  ): Promise<User> {
    const res = await this.paymentService.createSubscription(source, req.user);
    return res;
  }

  @Mutation(() => User)
  @UseGuards(UserAuthGuard)
  async changeCard(
    @Args("source") source: PaymentInput,
    @Context() { req }: Ctx
  ): Promise<User> {
    const res = await this.paymentService.changeCard(source, req.user);
    return res;
  }

  @Mutation(() => User)
  @UseGuards(UserAuthGuard)
  async cancelSubscription(@Context() { req }: Ctx): Promise<User> {
    const res = await this.paymentService.cancelSubscription(req.user);
    return res;
  }
}
