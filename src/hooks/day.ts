import moment from 'moment';
import { useEffect, useState } from 'react';
import { Day } from '../types/data';
import { Response } from '../types/responses';
import { useQuery } from './query';

/**
 * Day hook
 * 
 * @param userId User id
 * @param date Day date
 * @returns User days
 */
export const useDay = (userId: string, date: Date) => {
  const [day, setDay] = useState<Day>();
  const query = useQuery();

  useEffect(() => {
    query.get<Response>(`http://localhost:8080/users/${userId}/days/${moment(date).format('YYYY-MM-DD')}`)
      .then((res) => setDay(res.data.day))
      .catch(console.error);
  }, [userId, date, query]);

  return day;
}
