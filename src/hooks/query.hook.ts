import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config/config';
import { User } from '../types/data.types';
import { LocalStorageKey } from '../types/local-storage.types';
import { AccessTokenResponse, DataResponse, Response } from '../types/response.types';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type QueryOptions = {
  auth?: boolean;
  body?: any;
}
const defaultQueryOptions: QueryOptions = {
  auth: false
}

export const useQuery = () => {
  const query = async <R extends Response>(method: Method, url: string, options: QueryOptions = defaultQueryOptions) => {
    const config: AxiosRequestConfig = {};
    if (options.auth) {
      if (checkExpiration()) {
        await login(localStorage.getItem(LocalStorageKey.REFRESH_TOKEN)); // TODO Tester l'auto relogin après expiration
      }
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}`
      }
    }
    let res: AxiosResponse<R>;
    switch (method) {
      case 'GET':
        res = await axios.get(url, config);
        break;
      case 'POST':
        res = await axios.post(url, options.body, config);
        break;
      case 'PUT':
        res = await axios.put(url, options.body, config);
        break;
      case 'PATCH':
        res = await axios.put(url, options.body, config);
        break;
      case 'DELETE':
        res = await axios.put(url, options.body, config);
        break;
      default: throw new Error(`Unsupported HTTP method ${method}`);
    }
    return res.data;
  }

  const login = async (refreshToken: string) => {
    const res = await query<AccessTokenResponse>('POST', `${config.apiUrl}/auth/accessToken`, { body: { refresh_token: refreshToken } });
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, res.accessToken);
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, res.refreshToken);
    localStorage.setItem(LocalStorageKey.TIMESTAMP, res.timestamp.toString(10));
    localStorage.setItem(LocalStorageKey.EXPIRATION, res.expiration.toString(10));
  }

  const checkExpiration = () => {
    const timestamp = parseInt(localStorage.getItem(LocalStorageKey.TIMESTAMP), 10);
    const expiration = parseInt(localStorage.getItem(LocalStorageKey.EXPIRATION), 10);
    return timestamp && expiration && (Date.now() - timestamp >= expiration);
  }

  return {
    auth: {
      accessToken: (refreshToken: string) => login(refreshToken)
    },
    users: {
      find: () => query<DataResponse<User[]>>('GET', `${config.apiUrl}/users`, { auth: true }),
      findByUsername: (username: string) => query<DataResponse<User>>('GET', `${config.apiUrl}/users/${username}`, { auth: true }),
      me: {
        find: () => query<DataResponse<User>>('GET', `${config.apiUrl}/me`, { auth: true })
      }
    }
  };
}
