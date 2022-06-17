import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';

/**
 * Authentication hook
 * 
 * This hook wraps the authentication context.
 */
export const useAuth = () => {
  return useContext(AuthContext);
}
