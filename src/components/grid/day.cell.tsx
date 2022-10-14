import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Day, User } from '../../types/data.types';

export type DayCellProps = {
  dayDate: string;
  user: User;
  day?: Day;
}

export const DayCell = ({ dayDate, user, day }: DayCellProps) => {
  const buildBackground = useMemo(() => {
    if (day) {
      const colors = day.emotions.map(emotion => emotion.color);
      switch (colors.length) {
        case 0: return '#FF0000';
        case 1: return colors[0];
        default: {
          const gradientColors = colors.map((color, i, arr) => `${color} ${(i + 1) / arr.length * 100}%`);
          return `linear-gradient(340deg, ${gradientColors.join(', ')})`;
        }
      }
    }
    return '#FF0000';
  }, [day]);

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
