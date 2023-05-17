import { Session } from "express-session";
import Redis from "ioredis";
import { Request, Response } from "express";
import { User } from "./modules/user/user.model";
import { Field, InterfaceType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FieldError {
  @Field() field: string;
  @Field() message: string;
}

@InterfaceType()
export abstract class Errors {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

export type Ctx = {
  req: Request & { session: Session; user: User };
  res: Response;
  redisClient: Redis;
};
