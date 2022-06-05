import { padStart } from 'lodash';
import moment from 'moment';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDays } from '../../hooks/days';
import { Cell } from './cell';
import { EmptyCell } from './empty-cell';

/** Grid component */
export const Grid = () => {
  const params = useParams<'userId'>();
  const [queryParams] = useSearchParams();
  const days = useDays(params.userId, parseInt(queryParams.get('year'), 10));

  const buildCells = () => {
    const cells = [];
    const year = queryParams.has('year') ? queryParams.get('year') : moment(new Date()).format('YYYY');
    for (let dayNumber = 0; dayNumber < 31; dayNumber++) {
      for (let monthNumber = 0; monthNumber < 12; monthNumber++) {
        const dateFormat = `${year}-${padStart((monthNumber + 1).toFixed(), 2, '0')}-${padStart((dayNumber + 1).toFixed(), 2, '0')}`;
        const date = moment(dateFormat, true);
        if (date.isValid()) {
          cells.push(
            <Cell
              key={date.format('YYYY-MM-DD')}
              date={date.toDate()}
              day={days.find(day => moment(day.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'))}
            />
          )
        } else {
          cells.push(<EmptyCell key={dateFormat} />);
        }
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
