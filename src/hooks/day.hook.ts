import { useEffect, useState } from 'react'
import { Day, User } from '../types/data.types';
import { useQuery } from './query.hook';

export const useDays = (user: User, year: number) => {
  const [days, setDays] = useState<Day[]>([]);
  const query = useQuery();
  useEffect(() => {
    if (user) {
      query.days.find(user, year)
        .then(res => setDays(res.data))
        .catch(err => console.error('Could not find days', err));
    }
  }, [user]);
  return days;
}
