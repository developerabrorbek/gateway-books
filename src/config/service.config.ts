import { registerAs } from '@nestjs/config';

declare interface ServiceConfigOptions {
  host: string;
  port: number;
}
export const serviceConfig = registerAs<ServiceConfigOptions>(
  'service',
  (): ServiceConfigOptions => ({
    host: process.env.SERVICE_HOST ?? "127.0.0.1",
    port: process.env.SERVICE_PORT
      ? parseInt(process.env.SERVICE_PORT, 10)
      : 3001,
  }),
);

