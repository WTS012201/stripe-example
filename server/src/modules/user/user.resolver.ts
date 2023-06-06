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
import { RegisterInput } from "./dto/register.input";

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(() => User)
  async register(@Args("register") register: RegisterInput): Promise<User> {
    const res = await this.userService.create(register);
    return res;
  }

  @ResolveField(() => String, { nullable: true })
  email(@Root() user: User, @Context() { req }: Ctx): string {
    if (req.user.id === user.id) {
      return user.email;
    }
  }
}
