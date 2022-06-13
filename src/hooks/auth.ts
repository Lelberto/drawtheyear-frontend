import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { User } from '../types/data'

/**
 * Authentication hook
 * 
 * This hook uses the authentication context to get the authenticated user.
 */
export const useAuth = (): User => {
  const { authUser } = useContext(AuthContext);
  return authUser;
}
