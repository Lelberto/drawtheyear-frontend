import { useParams } from 'react-router-dom';
import { useDay } from '../../hooks/day.hook';

export const DayView = () => {
  const { dayDate } = useParams();
  const day = useDay(dayDate);

  return (
    <div>{day?.id}</div>
  );
}
