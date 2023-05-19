import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentModule } from "../payment/payment.module";
import { User } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), PaymentModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
