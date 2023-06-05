import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./LocalStrategy";
import { SessionSerializer } from "./SessionSerializer";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
