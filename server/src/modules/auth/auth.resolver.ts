import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Ctx, SESSION_COOKIE } from "src/constants";
import { User } from "../user/user.model";
import { GqlAuthGuard, LocalAuthGuard } from "./auth.guard";
import { LoginArgs } from "./dto/login.args";

@Resolver()
export class AuthResolver {
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

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  async login(
    @Args("credentials") _: LoginArgs,
    @Context() { req }: Ctx
  ): Promise<User> {
    return req.user;
  }

  @Query(() => User, { nullable: true })
  me(@Context() { req }: Ctx): User {
    if (!req.user) {
      return null;
    }

    return req.user;
  }
}
