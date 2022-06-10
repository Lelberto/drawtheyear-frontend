import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQuery } from '../../../hooks/query';
import { Day, Emotion } from '../../../types/data';
import { Cell } from './cell';

/** Day cell props */
export type DayCellContentProps = {
  dayNumber: number;
  day?: Day;
}

/**
 * Day cell
 * 
 * @extends Cell
 */
export const DayCell = ({ dayNumber, day }: DayCellContentProps) => {
  const query = useQuery();
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  useEffect(() => {
    if (day) {
      query.get(`http://localhost:8080/users/jerme/days/${moment(day.date).format('YYYY-MM-DD')}/emotions`)
        .then(res => setEmotions(res.data.emotions))
        .catch(console.error);
    }
  }, [dayNumber, day]);
  
  return (
    <Cell>
      <div style={{ backgroundColor: emotions.length ? emotions[0].color : '#00000000' }}>
        {dayNumber}
      </div>
    </Cell>
  );
}
