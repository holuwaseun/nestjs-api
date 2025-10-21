import { z } from 'zod';

const EnvSchema = z.object({
  APP_HOST: z.string(),
  APP_PORT: z.coerce.number(),
  APP_URL: z.string(),

  NODE_ENV: z.string(),
});

export const config = () => {
  const env = EnvSchema.parse(process.env);

  return {
    SERVER: {
      APP_URL: env.APP_URL,
      ENV: env.NODE_ENV,
      HOST: env.APP_HOST,
      PORT: env.APP_PORT,
      URL: env.APP_URL,
    },
  };
};
