import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      className="flex px-2 py-1 border rounded justify-between align-middle"
      style={{ background: buildBackground }}
    >
      <span className="w-2 text-xs">
        {/* TODO This section is used for notifications, coming soon */}
        {/* <FontAwesomeIcon icon={faCircle} className="shadow-md" /> */}
      </span>
      <span className="drop-shadow-md">{dayDate.substring(8)}</span>
      <span className="w-2 text-xs">
        {day?.visibility === 'private' && (
            <FontAwesomeIcon icon={faLock} className="shadow-md" />
        )}
      </span>
    </Link>
  );
}
