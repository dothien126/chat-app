import axios, { AxiosInstance } from 'axios';
import { env } from './utils/myVariable';
import Cookies from 'js-cookie';

const cookie = Cookies.get(env.nameCookie);

export function apiAuthClient(): AxiosInstance {
  return axios.create({
    baseURL: env.hostServer,
    withCredentials: true,
    // @ts-ignore
    headers: { 'Access-Control-Allow-Credentials': true },
  });
}

export function apiClient(authorization: string): AxiosInstance {
  return axios.create({
    baseURL: env.hostServer,
    headers: { 'Content-Type': 'app;ication/json', authorization: authorization },
  });
}
