import { Day, Emotion, User } from '../types/data.types';
import { useQuery } from './query.hook';
import { useAuthUser } from './user.hook';

type DayManagerOptions = {
  useMe: boolean;
}

export const useDayManager = (options: DayManagerOptions = { useMe: true }) => {
  const authUser = useAuthUser();
  const query = useQuery();

  const findByYear = async (user: User, year: number) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.findDays(year);
    }
    return await query.users.findDays(user.username, year);
  }

  const findByDate = async (user: User, date: string) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.findDayByDate(date);
    }
    return await query.users.findDayByDate(user.username, date);
  }

  const create = async (user: User, data: Partial<Day>) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.createDay(data);
    }
    return await query.users.createDay(user.username, data);
  }

  const update = async (user: User, day: Day, data: Partial<Day>) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.updateDay(day.date, data);
    }
    return await query.users.updateDay(user.username, day.date, data);
  }

  const addEmotion = async (user: User, day: Day, emotion: Emotion) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.addEmotionToDay(day.date, emotion.id);
    }
    return await query.users.addEmotionToDay(user.username, day.date, emotion.id);
  }

  const removeEmotion = async (user: User, day: Day, emotion: Emotion) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.removeEmotionFromDay(day.date, emotion.id);
    }
    return await query.users.removeEmotionFromDay(user.username, day.date, emotion.id);
  }

  return {
    findByYear,
    findByDate,
    create,
    update,
    addEmotion,
    removeEmotion
  };
}
