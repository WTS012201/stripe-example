import { Session } from "express-session";
import Redis from "ioredis";
import { Request, Response } from "express";
import { User } from "./modules/user/user.model";
import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

@ObjectType()
export class FieldErrorMessage {
  @Field() field: string;
  @Field() message: string;
}

export type Ctx = {
  req: Request & { session: Session; user: User };
  res: Response;
  redisClient: Redis;
};

export class FieldError extends GraphQLError {
  constructor(...fieldErrors: FieldErrorMessage[]) {
    super("invalid input", {
      extensions: {
        code: "FIELD_ERROR",
        fieldErrors,
      },
    });
  }
}

export const __prod__ = process.env.NODE_ENV === "production";
export const SESSION_COOKIE = "SID";
