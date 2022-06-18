import { padStart } from 'lodash';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Cell } from './cell';

export type EmptyCellProps = {
  date: Date;
}

/**
 * Empty cell
 * 
 * @extends Cell
 */
export const EmptyCell = ({ date }: EmptyCellProps) => {
  const navigate = useNavigate();

  const handleCellClick = () => {
    navigate(`../day/${moment(date).format('YYYY-MM-DD')}`);
  }

  return (
    <Cell onClick={handleCellClick}>
      <div className="cursor-pointer">
        {padStart(date.getDate().toFixed(), 2, '0')}
      </div>
    </Cell>
  );
}
