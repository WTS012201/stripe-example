import {
  Injectable,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from "@nestjs/common";
import { FieldError } from "src/constants";

@Injectable()
export default class ClassValidatorPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        const fieldErrors = errors.map((error: ValidationError) => {
          const message = Object.values(error.constraints).reduce(
            (prev, curr) => curr + prev,
            ""
          );
          return { field: error.property, message };
        });

        throw new FieldError(...fieldErrors);
      },
      forbidUnknownValues: false,
      whitelist: true,
    });
  }
}
