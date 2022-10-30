import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import moment from 'moment';
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
  const isAfterNow = moment(dayDate).isAfter(moment());
  const background = useMemo(() => day && cssColors(...day.emotions.map(emotion => emotion.color)), [day]);

  const cellClassName = classNames(
    'flex justify-between',
    'px-2 py-1',
    'border rounded',
    {
      'opacity-50': !day,
      'opacity-100': day,
      'hover:opacity-80': !isAfterNow
    },
    {
      'bg-red-800': isAfterNow
    }
  );

  return (
    <Link
      to={user && !isAfterNow ? `/user/${user.username}/day/${dayDate}` : ''}
      className={cellClassName}
      style={{ background }}
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
