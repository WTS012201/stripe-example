import { Inject } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import { PaymentService } from "./payment.service";

@Resolver()
export class PaymentResolver {
  constructor(@Inject(PaymentService) private paymentService: PaymentService) {}
}
