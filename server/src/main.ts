import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as passport from "passport";
import * as session from "express-session";
const RedisStore = require("connect-redis").default;
import { createClient } from "redis";
import { Logger } from "@nestjs/common";

const main = async () => {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://localhost:3000",
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
      name: "name",
      store: new RedisStore({ client: redisClient }),
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        // secure: true,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(4000);
};

main().catch((err) => console.log(err));
