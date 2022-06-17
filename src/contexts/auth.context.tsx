import { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import config from '../config/config';
import { useQuery } from '../hooks/query.hook';
import { User } from '../types/data';
import { LocalStorageKey } from '../types/local-storage';

/** Authentication context value */
type AuthContextValue = {
  authUser: User;
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
  const query = useQuery();

  const refreshAuthUser = async () => {
    const { api } = config;
    const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    const res = await query.get(`${api.url}${api.endpoints.userProfile}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    setAuthUser(res.data.user);
  }

  const updateTokens = async (refreshToken: string) => {
    const { api } = config;
    const res = await query.post(`${api.url}${api.endpoints.accessToken}`, { 'refresh_token': refreshToken });
    const { access_token, refresh_token } = res.data;
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refresh_token);
  }

  const clearTokens = () => {
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
  }

  useEffect(() => {
    const refreshToken = localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);
    if (refreshToken) {
      updateTokens(refreshToken).then(() => {
        refreshAuthUser()
          .then(() => console.log('User authenticated'))
          .catch((err: AxiosError) => console.error('Could not refresh authenticated user:', err.response.data));
      }).catch((err: AxiosError) => {
        clearTokens();
        console.error('Could not update authentication tokens:', err.response.data)
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, refreshAuthUser, updateTokens }}>
      {children}
    </AuthContext.Provider>
  );
}
