import { registerAs } from '@nestjs/config';

export const configProvider = registerAs<AppConfig>('app', () => {
  const driver = process.env.DB_DRIVER ?? 'postgres';
  const url =
    process.env.DB_URL ??
    (driver === 'postgres'
      ? 'postgres://prac:test@localhost:5432/prac'
      : 'mongodb://localhost:27017/afisha');
  return {
    database: {
      driver,
      url,
    },
  };
});

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
