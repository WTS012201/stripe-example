import "dotenv-safe/config";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as passport from "passport";
import * as session from "express-session";
const RedisStore = require("connect-redis").default;
import { createClient } from "redis";
import { Logger, ValidationError, ValidationPipe } from "@nestjs/common";
import { SESSION_COOKIE, __prod__ } from "./constants";
import { GraphQLError } from "graphql";
import ClassValidatorPipe from "./utils/ClassValidatorPipe";

const main = async () => {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  const redisClient = createClient();
  await redisClient.connect();

  redisClient.on("error", (err) =>
    Logger.error("Could not establish a connection with redis. " + err)
  );
  redisClient.on("connect", () =>
    Logger.verbose("Connected to redis successfully")
  );

  app.use(
    session({
      name: SESSION_COOKIE,
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: !__prod__,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        domain: __prod__ ? "" : undefined,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ClassValidatorPipe({
      forbidUnknownValues: false,
      whitelist: true,
    })
  );

  await app.listen(4000);
};

main().catch((err) => console.log(err));
