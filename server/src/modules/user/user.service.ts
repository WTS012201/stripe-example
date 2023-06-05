import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.model";
import * as argon2 from "argon2";
import { FieldError } from "src/constants";
import { RegisterArgs } from "./dto/register.args";
import { UserResponse } from "./dto/user.response";
import { LoginArgs } from "../auth/dto/login.args";
import { GraphQLError } from "graphql";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRep: Repository<User>
  ) {}

  async create(data: RegisterArgs): Promise<UserResponse> {
    data.password = await argon2.hash(data.password);
    let createdUser = this.userRep.create(data);

    try {
      createdUser = await createdUser.save();
    } catch (err: any) {
      if (err.code === "23505") {
        const error: FieldError = {
          message: "username taken",
          field: "username",
        };

        throw new GraphQLError("invalid input", {
          extensions: {
            code: "FIELD_ERROR",
            fieldErrors: [error],
          },
        });
      }
    }

    return { user: createdUser };
  }

  async loginByUsername({
    username,
    password,
  }: LoginArgs): Promise<User | null> {
    const user = await this.userRep.findOneBy({
      username,
    });
    if (!user) {
      return null;
    }

    const valid = await argon2.verify(user.password, password);
    return valid ? user : null;
  }

  findUserById(id: number): Promise<User> {
    return this.userRep.findOneBy({ id });
  }
}
