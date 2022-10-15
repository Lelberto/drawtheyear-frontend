import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Day, User } from '../../types/data.types';
import { cssColors } from '../../utils/color.utils';

export type DayCellProps = {
  dayDate: string;
  user: User;
  day?: Day;
}

export const DayCell = ({ dayDate, user, day }: DayCellProps) => {
  const buildBackground = useMemo(() => day ? cssColors(...day.emotions.map(emotion => emotion.color)) : '#000000', [day]);

  return (
    <Link
      to={user && day ? `/user/${user.username}/day/${day.date}` : `/create-day?date=${dayDate}`}
      className="px-2 py-1 border rounded text-center"
      style={{ background: buildBackground }}
    >
      <span>{dayDate.substring(8)}</span>
    </Link>
  );
}
