import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config/config';
import { Day, Emotion, User } from '../types/data.types';
import { LocalStorageKey } from '../types/local-storage.types';
import { AccessTokenResponse, CreationResponse, DataResponse, Response } from '../types/response.types';

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
        res = await axios.patch(url, options.body, config);
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
      createEmotion: (username: string, data: Partial<Emotion>) => query<CreationResponse>('POST', `${config.apiUrl}/users/${username}/emotions`, { auth: true, body: data }),
      findDays: (username: string, year?: number) => query<DataResponse<Day[]>>('GET', `${config.apiUrl}/users/${username}/days?year=${year}`, { auth: true }),
      findEmotions: (username: string) => query<DataResponse<Emotion[]>>('GET', `${config.apiUrl}/users/${username}/emotions`, { auth: true }),
      findDayByDate: (username: string, dayDate: string) => query<DataResponse<Day>>('GET', `${config.apiUrl}/users/${username}/days/${dayDate}`, { auth: true }),
      createDay: (username: string, data: Partial<Day>) => query<CreationResponse>('POST', `${config.apiUrl}/users/${username}/days`, { auth: true, body: data }),
      updateDay: (username: string, dayDate: string, data: Partial<Day>) => query<CreationResponse>('PATCH', `${config.apiUrl}/users/${username}/days/${dayDate}`, { auth: true, body: data }),
      addEmotionToDay: (username: string, dayDate: string, emotionId: string) => query<CreationResponse>('PATCH', `${config.apiUrl}/users/${username}/days/${dayDate}/emotions/add`, { auth: true, body: { emotionId } }),
      removeEmotionFromDay: (username: string, dayDate: string, emotionId: string) => query<CreationResponse>('PATCH', `${config.apiUrl}/users/${username}/days/${dayDate}/emotions/remove`, { auth: true, body: { emotionId } }),
      me: {
        find: () => query<DataResponse<User>>('GET', `${config.apiUrl}/me`, { auth: true }),
        findEmotions: () => query<DataResponse<Emotion[]>>('GET', `${config.apiUrl}/me/emotions`, { auth: true }),
        createEmotion: (data: Partial<Emotion>) => query<CreationResponse>('POST', `${config.apiUrl}/me/emotions`, { auth: true, body: data }),
        findDays: (year?: number) => query<DataResponse<Day[]>>('GET', `${config.apiUrl}/me/days?year=${year}`, { auth: true }),
        findDayByDate: (dayDate: string) => query<DataResponse<Day>>('GET', `${config.apiUrl}/me/days/${dayDate}`, { auth: true }),
        createDay: (data: Partial<Day>) => query<CreationResponse>('POST', `${config.apiUrl}/me/days`, { auth: true, body: data }),
        updateDay: (dayDate: string, data: Partial<Day>) => query<CreationResponse>('PATCH', `${config.apiUrl}/me/days/${dayDate}`, { auth: true, body: data }),
        addEmotionToDay: (dayDate: string, emotionId: string) => query<CreationResponse>('PATCH', `${config.apiUrl}/me/days/${dayDate}/emotions/add`, { auth: true, body: { emotionId } }),
        removeEmotionFromDay: (dayDate: string, emotionId: string) => query<CreationResponse>('PATCH', `${config.apiUrl}/me/days/${dayDate}/emotions/remove`, { auth: true, body: { emotionId } })
      }
    },
    emotions: {
      updateEmotion: (emotionId: string, data: Partial<Emotion>) => query<CreationResponse>('PATCH', `${config.apiUrl}/emotions/${emotionId}`, { auth: true, body: data }),
    }
  };
}
