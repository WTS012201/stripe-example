import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.model";
import * as argon2 from "argon2";
import { FieldError, FieldErrorMessage } from "src/constants";
import { RegisterInput } from "./dto/register.input";
import { LoginInput } from "../auth/dto/login.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRep: Repository<User>
  ) {}

  async create(data: RegisterInput): Promise<User> {
    data.password = await argon2.hash(data.password);
    let createdUser = this.userRep.create(data);

    try {
      createdUser = await createdUser.save();
    } catch (err: any) {
      if (err.code === "23505") {
        const error: FieldErrorMessage = {
          message: "username taken",
          field: "username",
        };

        throw new FieldError(error);
      }
    }

    return createdUser;
  }

  async loginByUsername({
    username,
    password,
  }: LoginInput): Promise<User | null> {
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
