import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/contexts/auth.context';
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
