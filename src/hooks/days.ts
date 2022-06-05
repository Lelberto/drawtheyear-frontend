import moment from 'moment';
import { useEffect, useState } from 'react';
import { Day } from '../types/data';
import { Response } from '../types/responses';
import { useQuery } from './query';

/**
 * Days hook
 * 
 * @param userId User id
 * @param year Year
 * @returns User days
 */
export const useDays = (userId: string, year?: number) => {
  year = year || moment().year();
  const [days, setDays] = useState<Day[]>([]);
  const query = useQuery();

  useEffect(() => {
    query.get<Response>(`http://localhost:8080/users/${userId}/days?from=${year}-01-01&to=${year}-12-31`)
      .then((res) => setDays(res.data.days))
      .catch(console.error);
  }, []);

  return days;
}
