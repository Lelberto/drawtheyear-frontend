import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

/**
 * Authentication hook
 * 
 * This hook wraps the authentication context.
 */
export const useAuth = () => {
  return useContext(AuthContext);
}
