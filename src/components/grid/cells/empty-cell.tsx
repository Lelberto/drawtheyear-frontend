import { padStart } from 'lodash';
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
  const handleCellClick = () => {
    console.log(date);
  }

  return (
    <Cell onClick={handleCellClick}>
      <div className="cursor-pointer">
        {padStart(date.getDate().toFixed(), 2, '0')}
      </div>
    </Cell>
  );
}
