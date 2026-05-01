import * as dotenv from 'dotenv';
import path from 'path';

// const env = process.env.TEST_ENV || 'dev'; // default dev

// dotenv.config({
//   path: `.env.${env}`
// });

// export const config = {
//   baseURL: process.env.BASE_URL,
//   username: process.env.USERNAME,
//   password: process.env.PASSWORD
// };


export function loadEnv() {
  //const envPath = path.resolve(__dirname,  `env/.env.${process.env.ENV || 'prod'}`);
  //const envPath = path.resolve(__dirname, 'env', `.env.${process.env.ENV || 'prod'}`);
   const envPath = path.join(__dirname,  `env/.env.${process.env.ENV || 'prod'}`);
  dotenv.config({ path: envPath });

  return {
    baseURL: process.env.BASE_URL,
    username: process.env.APP_USER,
    password: process.env.PASSWORD
  };
}
