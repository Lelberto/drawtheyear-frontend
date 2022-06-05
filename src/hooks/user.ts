import { useEffect, useState } from 'react';
import { User } from '../types/data';
import { Response } from '../types/responses';
import { useQuery } from './query';

/**
 * User hook
 * 
 * @param id User id
 * @returns User
 */
export const useUser = (id: string) => {
  const [user, setUser] = useState<User>(null);
  const query = useQuery();

  useEffect(() => {
    query.get<Response>(`http://localhost:8080/users/${id}`)
      .then((res) => setUser(res.data.user))
      .catch(console.error);
  }, [id, query]);

  return user;
}
