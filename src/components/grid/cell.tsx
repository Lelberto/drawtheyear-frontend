import moment from 'moment';
import { Day } from '../../types/data';

/** Cell props */
type CellProps = {
  date: Date;
  day?: Day;
}

/** Cell */
export const Cell = ({ date, day }: CellProps) => (
  <div>
    <div>{moment(date).format('YYYY-MM-DD')}</div>
    {day && (
      <p>{day.description}</p>
    )}
  </div>
);
