import { useOutletContext } from 'react-router-dom';
import { User } from '../types/data';

/**
 * User hook
 * 
 * This hook will get the user included in outlet context.
 * 
 * @returns User
 */
export const useUser = () => {
  const ctx = useOutletContext<{ user: User }>();
  return ctx?.user;
}
