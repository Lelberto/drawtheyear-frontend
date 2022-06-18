import { padStart } from 'lodash';
import { useEffect, useState } from 'react';
import { useHateoas } from '../../../hooks/hateoas.hook';
import { Day, Emotion } from '../../../types/data';
import { Cell } from './cell';

/** Day cell props */
export type DayCellContentProps = {
  day: Day;
}

/**
 * Day cell
 * 
 * @extends Cell
 */
export const DayCell = ({ day }: DayCellContentProps) => {
  const hateoas = useHateoas();
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  useEffect(() => {
    if (day) {
      hateoas.fetch(day._links, 'day-emotions')
        .then(res => setEmotions(res.data.emotions))
        .catch(console.error);
    }
  }, [day]);

  const handleCellClick = () => {
    console.log(day);
  }
  
  return (
    <Cell onClick={handleCellClick}>
      <div
        className="cursor-pointer"
        style={{ backgroundColor: emotions.length ? emotions[0].color : '#00000000' }}
      >
        {padStart(new Date(day.date).getDate().toFixed(), 2, '0')}
      </div>
    </Cell>
  );
}
