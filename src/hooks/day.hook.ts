import { useEffect, useState } from 'react'
import { Day, User } from '../types/data.types';
import { useQuery } from './query.hook';
import { useAuthUser } from './user.hook';

type DaysHookOptions = {
  checkAuthUser?: boolean;
}
export const useDays = (user: User, year: number, options: DaysHookOptions = { checkAuthUser: true }) => {
  const [days, setDays] = useState<Day[]>([]);
  const authUser = useAuthUser();
  const query = useQuery();
  useEffect(() => {
    if (user) {
      if (options.checkAuthUser && user.id === authUser?.id) {
        query.users.me.findDays(year)
          .then(res => setDays(res.data))
          .catch(err => console.error('Could not find days', err));
      } else {
         query.users.findDays(user.username, year)
          .then(res => setDays(res.data))
          .catch(err => console.error('Could not find days', err));
      }
    }
  }, [user, authUser, year]);
  return days;
}

type DayHookOptions = DaysHookOptions;
export const useDay = (user: User, date: string, options: DayHookOptions = { checkAuthUser: true }) => {
  const [day, setDay] = useState<Day>();
  const authUser = useAuthUser();
  const query = useQuery();
  useEffect(() => {
    if (user) {
      if (options.checkAuthUser && user.id === authUser?.id) {
        query.users.me.findDayByDate(date)
          .then(res => setDay(res.data))
          .catch(err => console.error('Could not find day', err));
      } else {
        query.users.findDayByDate(user.username, date)
          .then(res => setDay(res.data))
          .catch(err => console.error('Could not find day', err));
      }
    }
  }, [user, authUser, date]);
  return day;
}
