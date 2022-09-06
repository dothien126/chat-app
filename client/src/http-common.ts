import axios, { AxiosInstance } from 'axios';
import { env } from './utils/myVariable';

// export function apiAuthClient(): AxiosInstance {
//   return axios.create({
//     baseURL: env.hostServer,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// export function apiIsClient(): AxiosInstance {
//   return axios.create({
//     baseURL: env.hostServer,
//     // @ts-ignore
//     headers: { 'Content-Type': 'application/json', authorization: cookie },
//   });
// }

export function apiClient(authorization: string): AxiosInstance {
  return axios.create({
    baseURL: env.hostServer,
    headers: { 'Content-Type': 'application/json', authorization: authorization },
  });
}
