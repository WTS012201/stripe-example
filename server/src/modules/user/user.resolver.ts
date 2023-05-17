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
import { Ctx } from "src/constants";

@Resolver(User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

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
  me(@Context() { req }: Ctx): Promise<User> {
    if (!req.user.id) {
      return null;
    }

    return this.userService.findUserById(req.user.id);
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
        res.clearCookie("name");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
