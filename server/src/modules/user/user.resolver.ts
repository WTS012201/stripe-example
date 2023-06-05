import { User } from "./user.model";
import {
  Resolver,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
} from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { UserService } from "./user.service";
import { Ctx } from "src/constants";
import { UserResponse } from "./dto/user.response";
import { RegisterArgs } from "./dto/register.args";

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(() => UserResponse)
  async register(
    @Args("register") register: RegisterArgs,
    @Context() { req }: Ctx
  ): Promise<UserResponse> {
    const res = await this.userService.create(register);
    if (!res.errors) req.user = res.user;
    return res;
  }

  @ResolveField(() => String, { nullable: true })
  email(@Root() user: User, @Context() { req }: Ctx): string {
    if (req.user.id === user.id) {
      return user.email;
    }
  }
}
