import axios, { AxiosRequestConfig } from 'axios';
import { Response } from '../types/responses';

/**
 * Query hook
 * 
 * This hook is used to fetch the API.
 * 
 * @returns Query hook
 */
export const useQuery = () => {

  /**
   * Executes a `GET` request to the target URL
   * 
   * @param url The URL to fetch
   * @param config Axios configuration
   * @returns Response
   * @async
   */
  const get = async <R extends Response>(url: string, config?: AxiosRequestConfig) => {
    const response = await axios.get<R>(url, config);
    return response.data;
  }

  /**
   * Executes a `POST` request to the target URL
   * 
   * @param url The URL to fetch
   * @param data The data to send (request body)
   * @returns Response
   * @async
   */
  const post = async <R extends Response, B = any>(url: string, data?: B) => {
    const response = await axios.post<R>(url, data);
    return response.data;
  }

  return { get, post };
}
