export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT?: string;
      JWT_SECRET: string;
      MONGODB_URI: string;
      RESEND_API_KEY: string;
      RESEND_FROM_EMAIL: string;
    }
  }
}
