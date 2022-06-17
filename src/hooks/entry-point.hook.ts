import { useEffect, useState } from 'react';
import { Link } from '../types/hateoas';
import { useHateoas } from './hateoas.hook'

/**
 * Entry point hook
 * 
 * This hook makes a `GET` request to the API entry point and returns response links.
 * 
 * @returns Entry point hook
 */
export const useEntryPoint = () => {
  const hateoas = useHateoas();
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    hateoas.fetchEntryPoint().then(links => setLinks(links)).catch(console.error);
  }, []);

  return { links };
}
