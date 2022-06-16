import { useEffect, useState } from 'react';
import config from '../config/config';
import { User } from '../types/data';
import { Response } from '../types/responses';
import { useQuery } from './query';

/**
 * User hook
 * 
 * @param username Username
 * @returns User
 */
export const useUser = (username: string) => {
  const { api } = config;
  const [user, setUser] = useState<User>();
  const query = useQuery();

  useEffect(() => {
    query.get<Response>(`${api.url}${api.endpoints.users}/${username}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
}
