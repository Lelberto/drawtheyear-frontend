import axios, { AxiosRequestConfig } from 'axios';
import { Link } from '../types/hateoas';
import { Response } from '../types/responses';

/**
 * Query hook
 * 
 * This hook is used to fetch the API.
 * HATEOAS system is also implemented.
 * 
 * @returns Query hook functions
 */
export const useQuery = () => {

  const get = async <R extends Response>(url: string, config?: AxiosRequestConfig) => {
    const response = await axios.get<R>(url, config);
    return response.data;
  }

  const post = async <R extends Response, B>(url: string, data: B) => {
    const response = await axios.post<R>(url, data);
    return response.data;
  }

  const fetch = async <R extends Response, B>(link: Link, data: B) => {
    const { method, href } = link;
    switch (method) {
      case 'GET': return await get<R>(href);
      case 'POST': return await post<R, B>(href, data);
      case 'PUT': // TODO implement
      case 'PATCH': // TODO implement
      case 'DELETE': // TODO implement
      default: throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  return { get, post, fetch };
}
