import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../user.model";
import { UserService } from "../user.service";

// this attaches the user entity on req if authenticated
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(UserService) private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: any, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(
    user: User,
    done: (err: any, user: User | null) => void
  ) {
    const userDB = await this.userService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
