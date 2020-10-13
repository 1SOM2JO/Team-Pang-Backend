import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../.env') });

export const hostAddress = process.env.HOST_ADDRESS;
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const db =
  environment === 'development'
    ? {
        name: process.env.TEST_DB_NAME,
        host: process.env.TEST_DB_HOST,
        port: Number(process.env.TEST_DB_PORT),
        user: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PWD,
      }
    : {
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
      };

export const apiKey = process.env.APIKEY;

// export const tokenInfo = {
//   accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS),
//   refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS),
//   issuer: process.env.TOKEN_ISSUER,
//   audience: process.env.TOKEN_AUDIENCE,
// };

export const logDirectory = process.env.LOG_DIR;

export const valueEncryptionKey = process.env.VALUE_ENCRYPTION_KEY;
