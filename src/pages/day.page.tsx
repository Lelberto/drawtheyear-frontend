import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useHateoas } from '../hooks/hateoas.hook';
import { useUser } from '../hooks/user.hook';
import { Day } from '../types/data';
import { DaysResponse } from '../types/responses';

/**
 * Day page
 * 
 * @path /user/`:username`/day/`:date`
 */
export const DayPage = () => {
  const { date } = useParams<'date'>();
  const hateoas = useHateoas();
  const user = useUser();
  const [day, setDay] = useState<Day>();

  const year = useMemo(() => new Date(date).getFullYear(), [date]);

  const fetchDay = useCallback(async () => {
    const rel = `user-days-${year}`;
    if (user && hateoas.hasLink(user._links, rel)) {
      const res = await hateoas.fetch<DaysResponse>(user._links, rel);
      return res.data.days.find(day => day.date === date);
    }
    return null;
  }, [user]);
  
  useEffect(() => {
    fetchDay().then((day) => setDay(day)).catch(console.error);
  }, [fetchDay]);

  return (
    <div>
      <Outlet context={{ user, day }} />
    </div>
  );
}
