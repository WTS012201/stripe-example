import { Field, InputType } from "@nestjs/graphql";
import {
  IsEmail,
  IsStrongPassword,
  Length,
  ValidationArguments,
} from "class-validator";

const passwordOptions = {
  minLength: 6,
  minNumbers: 2,
  minUppercase: 1,
  minSymbols: 0,
  maxLength: 64,
};

const passwordMessage = (args: ValidationArguments): string => {
  const cons = args.constraints[0];
  let msg = "password not strong enough. must include ";
  msg += `${cons.minNumbers} numbers, and `;
  msg += `${cons.minUppercase} uppercase letter`;

  return msg;
};

@InputType()
export class RegisterArgs {
  @Length(3, 16)
  @Field()
  username!: string;

  @Field()
  @IsStrongPassword(passwordOptions, {
    message: passwordMessage,
  })
  password!: string;

  @IsEmail()
  @Field()
  email!: string;
}
