import { useEffect, useState } from 'react';
import { Day } from '../types/data';
import { Response } from '../types/responses';
import { useQuery } from './query';

/**
 * Days hook
 * 
 * @param userId User id
 * @returns User days
 */
export const useDays = (userId: string) => {
  const [days, setDays] = useState<Day[]>([]);
  const query = useQuery();

  useEffect(() => {
    query.get<Response>(`http://localhost:8080/users/${userId}/days`)
      .then((res) => setDays(res.data.days))
      .catch(console.error);
  }, [userId, query]);

  return days;
}
