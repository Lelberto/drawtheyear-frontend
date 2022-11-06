import { Emotion, User } from '../types/data.types';
import { useQuery } from './query.hook';
import { useAuthUser } from './user.hook';

type EmotionManagerOptions = {
  useMe: boolean;
}

export const useEmotionManager = (options: EmotionManagerOptions = { useMe: true }) => {
  const authUser = useAuthUser();
  const query = useQuery();

  const find = async (user: User) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.findEmotions();
    }
    return await query.users.findEmotions(user.username);
  }

  const create = async (user: User, data: Partial<Emotion>) => {
    if (options.useMe && authUser && user.id === authUser.id) {
      return await query.users.me.createEmotion(data);
    }
    return await query.users.createEmotion(user.username, data);
  }

  const update = async (emotion: Emotion, data: Partial<Emotion>) => {
    return await query.emotions.updateEmotion(emotion.id, data);
  }

  return {
    find,
    create,
    update
  }
}
