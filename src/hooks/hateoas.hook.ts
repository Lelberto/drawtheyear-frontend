import { Link, Rel } from '../types/hateoas';
import { EntryPointResponse, Response } from '../types/responses';
import { useQuery } from './query.hook';

/**
 * HATEOAS hook
 * 
 * This hook is used to navigate in the API with HATEOAS.
 * 
 * @returns HATEOAS hook
 */
export const useHateoas = () => {
  const query = useQuery();

  const fetch = async <R extends Response, B = any>(links: Link[], rel: Rel) => {
    const link = links.find(link => link.rel === rel);
    if (!link) {
      throw new Error(`Link with rel ${rel} not found`);
    }
    const { method, href } = link;
    switch (method) {
      case 'GET': return await query.get<R>(href);
      case 'POST': return await query.post<R, B>(href);
      case 'PUT': // TODO implement
      case 'PATCH': // TODO implement
      case 'DELETE': // TODO implement
      default: throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  /**
   * Fetches the API entry point
   * 
   * @returns Entry point links
   */
  const fetchEntryPoint = async () => {
    const res = await query.get<EntryPointResponse>('http://localhost:8080');
    return res.data._links;
  }

  /**
   * Checks if an array of links has a specific rel
   * 
   * @param links Links
   * @param rel Rel to search
   * @returns True if the rel is included into links, false otherwise
   */
  const hasLink = (links: Link[] = [], rel: Rel) => {
    return links.some(link => link.rel === rel);
  }

  return { fetch, fetchEntryPoint, hasLink };
}
