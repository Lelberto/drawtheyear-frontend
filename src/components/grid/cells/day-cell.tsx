import { useEffect, useState } from 'react';
import { useHateoas } from '../../../hooks/hateoas.hook';
import { Day, Emotion } from '../../../types/data';
import { Cell } from './cell';

/** Day cell props */
export type DayCellContentProps = {
  dayNumber: number;
  day?: Day;
  onClick?: (day?: Day) => void;
}

/**
 * Day cell
 * 
 * @extends Cell
 */
export const DayCell = ({ dayNumber, day, onClick }: DayCellContentProps) => {
  const hateoas = useHateoas();
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  useEffect(() => {
    if (day) {
      hateoas.fetch(day._links, 'day-emotions')
        .then(res => setEmotions(res.data.emotions))
        .catch(console.error);
    }
  }, [dayNumber, day]);

  const handleClick = () => {
    if (day && hateoas.hasLink(day._links, 'day-emotions')) {
      // TODO Day details
    } else if (hateoas.hasLink(day._links, 'create-day')) {
      // TODO Create day
    }
  }
  
  return (
    <Cell>
      <div
        className="cursor-pointer"
        style={{ backgroundColor: emotions.length ? emotions[0].color : '#00000000' }}
        onClick={() => onClick && onClick(day)}
      >
        {dayNumber}
      </div>
    </Cell>
  );
}
