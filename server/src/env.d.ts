declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    STRIPE_SECRET: string;
    PLAN: string;
  }
}
