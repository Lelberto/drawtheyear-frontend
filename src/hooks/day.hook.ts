import { useEffect, useState } from 'react'
import { Day, User } from '../types/data.types';
import { useQuery } from './query.hook';
import { useAuthUser } from './user.hook';

export const useDays = (user: User, year: number) => {
  const [days, setDays] = useState<Day[]>([]);
  const query = useQuery();
  useEffect(() => {
    if (user) {
      query.days.find(user, year)
        .then(res => setDays(res.data))
        .catch(err => console.error('Could not find days', err));
    }
  }, [user, year]);
  return days;
}

export const useDay = (date: string) => {
  const [day, setDay] = useState<Day>();
  const user = useAuthUser();
  const query = useQuery();
  useEffect(() => {
    if (user) {
      query.users.me.findDayByDate(date)
        .then(res => setDay(res.data))
        .catch(err => console.error('Could not find day', err));
    }
  }, [user, date]);
  return day;
}
