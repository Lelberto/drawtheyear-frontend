import { padStart } from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHateoas } from '../../hooks/hateoas.hook';
import { Day, User } from '../../types/data';
import { Cell } from './cells/cell';
import { DayCell } from './cells/day-cell';
import { EmptyCell } from './cells/empty-cell';

/** Grid component props */
export type GridProps = {
  user: User;
}

/** Grid component */
export const Grid = ({ user }: GridProps) => {
  const [queryParams] = useSearchParams();
  const hateoas = useHateoas();
  const [days, setDays] = useState<Day[]>([]);
  
  const year = useMemo(
    () => parseInt(queryParams.get('year')) || new Date().getFullYear(),
    [queryParams]
  );

  useEffect(() => {
    if (user) {
      hateoas.fetch(user._links, `user-days-${year}`)
        .then((res) => setDays(res.data.days))
        .catch(console.error);
    }
  }, [user, year]);
    
  const buildCells = useCallback(() => {
    const cells = [];
    for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
      for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
        const dateFormat = `${year}-${padStart((monthNumber).toFixed(), 2, '0')}-${padStart((dayNumber).toFixed(), 2, '0')}`;
        const date = moment(dateFormat, true);
        if (date.isValid()) {
          const day = days.find(day => day.date === dateFormat);
          if (day) {
            cells.push(<DayCell key={dateFormat} day={day} />);
          } else {
            cells.push(<EmptyCell key={dateFormat} date={date.toDate()} />);
          }
        } else {
          cells.push(<Cell key={dateFormat}>---</Cell>);
        }
      }
    }
    return cells;
  }, [days, year]);

  return (
    <div className="grid grid-cols-12 gap-4">
      {buildCells()}
    </div>
  );
}
