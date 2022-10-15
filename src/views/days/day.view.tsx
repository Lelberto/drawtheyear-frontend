import { useParams } from 'react-router-dom';
import { useDay } from '../../hooks/day.hook';
import { useUser } from '../../hooks/user.hook';

export const DayView = () => {
  const { username, dayDate } = useParams();
  const user = useUser(username);
  const day = useDay(user, dayDate);

  return (
    <div>{day?.id}</div>
  );
}
