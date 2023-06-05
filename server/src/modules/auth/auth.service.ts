import { Inject, Injectable } from "@nestjs/common";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
  async validateUser(username: string, password: string): Promise<User> {
    return await this.userService.loginByUsername({ username, password });
  }
}
