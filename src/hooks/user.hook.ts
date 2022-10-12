import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { User } from '../types/data.types';
import { useQuery } from './query.hook';

export const useAuthUser = () => {
  const [authUser, setAuthUser] = useContext(AuthContext);
  const query = useQuery();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!authUser) {
        query.users.me.find()
          .then(res => setAuthUser(res.data))
          .catch(err => console.error('Could not find auth user', err));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return authUser;
}

export const useUser = (username: string) => {
  const [user, setUser] = useState<User>();
  const query = useQuery();
  useEffect(() => {
    query.users.findByUsername(username)
      .then(res => setUser(res.data))
      .catch(err => console.error(`Could not find user with username ${username}`, err));
  }, [username]);
  return user;
}
