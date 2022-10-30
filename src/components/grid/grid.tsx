import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { padStart } from 'lodash';
import moment from 'moment';
import { FC, useCallback, useEffect, useState } from 'react';
import { config } from '../../config/config';
import { useDayManager } from '../../hooks/day.hook';
import { Day, User } from '../../types/data.types';
import { DayCell } from './day.cell';
import { EmptyCell } from './empty.cell';

export type GridProps = {
  user: User;
  year: number;
  onPreviousYear: () => void;
  onNextYear: () => void;
}

export const Grid: FC<GridProps> = ({ user, year, onPreviousYear, onNextYear }: GridProps) => {
  const dayManager = useDayManager();
  const [days, setDays] = useState<Day[]>([]);
  
  const buildCells = useCallback((monthNumber: string) => {
    const cells = [];
    for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
      const currentDateValue = `${year}-${monthNumber}-${padStart(dayNumber.toString(), 2, '0')}`;
      const currentDate = moment(currentDateValue);
      if (currentDate.isValid()) {
        const day = days.find(currentDay => currentDay.date === currentDate.format(config.days.dateFormat));
        cells.push(<DayCell
          key={currentDateValue}
          dayDate={currentDate.format(config.days.dateFormat)}
          user={user}
          day={day}
        />);
      } else {
        cells.push(<EmptyCell key={currentDateValue} />);
      }
    }
    return cells;
  }, [days, year]);

  const refreshDays = () => {
    if (user) {
      dayManager.findByYear(user, year)
        .then(res => setDays(res.data))
        .catch(err => console.error(err));
    }
  }

  useEffect(() => refreshDays(), [user, year]);

  const navigationButtonClassName = classNames(
    'p-4',
    'border rounded-md',
    'bg-black/50 hover:bg-light/25 disabled:bg-red-800',
    'transition-colors duration-200',
    'disabled:cursor-not-allowed'
  );
  
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <button
          className={navigationButtonClassName}
          onClick={() => {
            onPreviousYear();
            setDays([]);
          }}
          disabled={year === config.days.minYear}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>{year}</h1>
        <button
          className={navigationButtonClassName}
          onClick={() => {
            onNextYear();
            setDays([]);
          }}
          disabled={year === moment().year()}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className="grid grid-cols-12 gap-2">
        <div>
          <div className="text-center">Janvier</div>
          <div className="flex flex-col gap-2">
            {buildCells('01')}
          </div>
        </div>
        <div>
          <div className="text-center">Février</div>
          <div className="flex flex-col gap-2 items-stretch">
            {buildCells('02')}
          </div>
        </div>
        <div>
          <div className="text-center">Mars</div>
          <div className="flex flex-col gap-2">
            {buildCells('03')}
          </div>
        </div>
        <div>
          <div className="text-center">Avril</div>
          <div className="flex flex-col gap-2">
            {buildCells('04')}
          </div>
        </div>
        <div>
          <div className="text-center">Mai</div>
          <div className="flex flex-col gap-2">
            {buildCells('05')}
          </div>
        </div>
        <div>
          <div className="text-center">Juin</div>
          <div className="flex flex-col gap-2">
            {buildCells('06')}
          </div>
        </div>
        <div>
          <div className="text-center">Juillet</div>
          <div className="flex flex-col gap-2">
            {buildCells('07')}
          </div>
        </div>
        <div>
          <div className="text-center">Août</div>
          <div className="flex flex-col gap-2">
            {buildCells('08')}
          </div>
        </div>
        <div>
          <div className="text-center">Septembre</div>
          <div className="flex flex-col gap-2">
            {buildCells('09')}
          </div>
        </div>
        <div>
          <div className="text-center">Octobre</div>
          <div className="flex flex-col gap-2">
            {buildCells('10')}
          </div>
        </div>
        <div>
          <div className="text-center">Novembre</div>
          <div className="flex flex-col gap-2">
            {buildCells('11')}
          </div>
        </div>
        <div>
          <div className="text-center">Décembre</div>
          <div className="flex flex-col gap-2">
            {buildCells('12')}
          </div>
        </div>
      </div>
    </div>
  );
}
