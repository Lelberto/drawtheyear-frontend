import { createContext, ReactNode, useEffect, useState } from 'react';
import { useQuery } from '../hooks/query';
import { User } from '../types/data';
import { Link } from '../types/hateoas';
import { LocalStorageKey } from '../types/local-storage';

/** Authentication context value */
type AuthContextValue = {
  authUser: User;
  links: Link[];
  refreshAuthUser: () => Promise<void>;
  updateTokens: (refreshToken?: string) => Promise<void>;
};

/**
 * Authentication context
 * 
 * This context is used to manage the authentication system (authenticated user, tokens, ...).
 */
export const AuthContext = createContext<AuthContextValue>(null);

/** Authentication context provider props */
type AuthContextProviderProps = {
  children?: ReactNode;
}

/** Authentication context provider */
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<User>();
  const [links, setLinks] = useState<Link[]>([]);
  const query = useQuery();

  const refreshAuthUser = async () => {
    const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    const res = await query.get('http://localhost:8080/users/profile', { headers: { Authorization: `Bearer ${accessToken}` } });
    setAuthUser(res.data.user);
    setLinks(res.links);
  }

  const updateTokens = async (refreshToken: string) => {
    const res = await query.post('http://localhost:8080/auth/accessToken', { 'refresh_token': refreshToken });
    const { access_token, refresh_token } = res.data;
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refresh_token);
  }

  useEffect(() => {
    const refreshToken = localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);
    if (refreshToken) {
      updateTokens(refreshToken).then(() => {
        refreshAuthUser()
          .then(() => console.log('User authenticated'))
          .catch(console.error);
      }).catch(console.error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, links, refreshAuthUser, updateTokens }}>
      {children}
    </AuthContext.Provider>
  );
}
