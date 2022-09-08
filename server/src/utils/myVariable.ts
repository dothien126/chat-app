import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// setup environment
export const env = {
  dbName: process.env.DB_NAME as string,
  dbHostName: process.env.DB_HOST_NAME as string,
  dbPort: process.env.DB_PORT as string,
  dbUserName: process.env.DB_USERNAME as string,
  dbPassword: process.env.DB_PASSWORD as string,
};

export const PATH_BASE_AVATAR = 'https://sso.inet.vn/uploads/';
export const DEFAULT_NO_AVATAR = '/src/assets/images/no-avatar.png';
export const errorServer = { error: 'Internal server error' };
export const errorUnknown = 'Unknown error!';
export const errorMsg = { error: 'Invalid request' };
export const notFoundMsg = { error: 'Data does not exist' };
export const isDataValid = { error: 'Please check again' };
export const jwtNotVerify = { error: 'Invalid request or not have access' };
export const isTokenValid = { error: 'Token is not invalid' };
