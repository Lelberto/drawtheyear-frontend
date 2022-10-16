import { useEffect, useState } from 'react';
import { Emotion, User } from '../types/data.types'
import { useQuery } from './query.hook';
import { useAuthUser } from './user.hook';

type DaysHookOptions = {
  checkAuthUser?: boolean;
}
export const useEmotions = (user: User, options: DaysHookOptions = { checkAuthUser: true }) => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const authUser = useAuthUser();
  const query = useQuery();
  useEffect(() => {
    if (user) {
      if (options.checkAuthUser && user.id === authUser?.id) {
        query.users.me.findEmotions()
          .then(res => setEmotions(res.data))
          .catch(err => console.error('Could not find emotions', err))
      } else {
        query.users.findEmotions(user.username)
          .then(res => setEmotions(res.data))
          .catch(err => console.error('Could not find emotions', err))
      }
    }
  }, [user, authUser]);
  return emotions;
}
