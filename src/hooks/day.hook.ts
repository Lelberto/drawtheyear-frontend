import { useEffect, useState } from 'react'
import { Day, Emotion, User } from '../types/data.types';
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

type DayHook = {
  day: Day,
  updateDay: (data: Partial<Day>) => void,
  addEmotion: (emotion: Emotion) => void,
  removeEmotion: (emotion: Emotion) => void
}
type DayHookOptions = DaysHookOptions;
export const useDay = (user: User, date: string, options: DayHookOptions = { checkAuthUser: true }): DayHook => {
  const [day, setDay] = useState<Day>();
  const authUser = useAuthUser();
  const query = useQuery();

  const fetch = () => {
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
  }

  const updateDay = (data: Partial<Day>) => {
    if (user) {
      if (options.checkAuthUser && user.id === authUser.id) {
        query.users.me.updateDay(date, data)
          .then(() => fetch())
          .catch(err => console.error('Could not update day', err));
      } else {
        query.users.updateDay(user.username, date, data)
          .then(() => fetch())
          .catch(err => console.error('Could not update day', err));
      }
    }
  }

  const addEmotion = (emotion: Emotion) => {
    if (user) {
      if (options.checkAuthUser && user.id === authUser.id) {
        query.users.me.addEmotionToDay(date, emotion.id)
          .then(() => fetch())
          .catch(err => console.error('Could not add emotion to day', err));
      } else {
        query.users.addEmotionToDay(user.username, date, emotion.id)
          .then(() => fetch())
          .catch(err => console.error('Could not add emotion to day', err));
      }
    }
  }

  const removeEmotion = (emotion: Emotion) => {
    if (user) {
      if (options.checkAuthUser && user.id === authUser.id) {
        query.users.me.removeEmotionFromDay(date, emotion.id)
          .then(() => fetch())
          .catch(err => console.error('Could not remove emotion from day', err));
      } else {
        query.users.removeEmotionFromDay(user.username, date, emotion.id)
          .then(() => fetch())
          .catch(err => console.error('Could not remove emotion from day', err));
      }
    }
  }

  useEffect(() => fetch(), [user, authUser, date]);

  return { day, updateDay, addEmotion, removeEmotion };
}
