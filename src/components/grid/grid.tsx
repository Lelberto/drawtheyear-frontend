import { padStart } from 'lodash';
import moment from 'moment';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDays } from '../../hooks/days';
import { DayCell } from './cells/day-cell';
import { EmptyCell } from './cells/empty-cell';

/** Grid component */
export const Grid = () => {
  const params = useParams<'userId'>();
  const [queryParams] = useSearchParams();
  const days = useDays(params.userId, parseInt(queryParams.get('year'), 10));

  const buildCells = () => {
    const cells = [];
    const year = queryParams.has('year') ? queryParams.get('year') : moment(new Date()).format('YYYY');
    for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
      for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
        const dateFormat = `${year}-${padStart((monthNumber).toFixed(), 2, '0')}-${padStart((dayNumber).toFixed(), 2, '0')}`;
        const date = moment(dateFormat, true);
        cells.push(date.isValid()
          ? <DayCell key={dateFormat} dayNumber={dayNumber} day={days.find(day => moment(day.date).format('YYYY-MM-DD') === dateFormat)} />
          : <EmptyCell key={dateFormat} />
        );
      }
    }
    return cells;
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {buildCells()}
    </div>
  );
}
