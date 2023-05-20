import { User } from "./user.model";
import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  ResolveField,
  Root,
} from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Credentials, LoginCredentials, UserResponse } from "./user.dto";
import { GqlAuthGuard, LocalAuthGuard, UserAuthGuard } from "./auth/auth.guard";
import { Ctx, SESSION_COOKIE } from "src/constants";
import { PaymentService } from "../payment/payment.service";

@Resolver(User)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(PaymentService) private paymentService: PaymentService
  ) {}

  @Mutation(() => UserResponse)
  async createUser(
    @Args("credentials") credentials: Credentials,
    @Context() { req }: Ctx
  ): Promise<UserResponse> {
    const res = await this.userService.create(credentials);
    if (!res.errors) req.user = res.user;
    return res;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  async login(
    @Args("credentials") _: LoginCredentials,
    @Context() { req }: Ctx
  ): Promise<User> {
    return req.user;
  }

  @Query(() => User, { nullable: true })
  @UseGuards(UserAuthGuard)
  me(@Context() { req }: Ctx): User {
    if (!req.user.id) {
      return null;
    }

    console.log(req.user);
    return req.user;
  }

  @ResolveField(() => String, { nullable: true })
  email(@Root() user: User, @Context() { req }: Ctx): string {
    if (req.user.id === user.id) {
      return user.email;
    }
  }

  @Mutation(() => Boolean)
  logout(@Context() { req, res }: Ctx): Promise<any> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(SESSION_COOKIE);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

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
