import moment from 'moment';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { EmotionBadge } from '../../components/badges/emotion.badge';
import { useDay } from '../../hooks/day.hook';
import { useUser } from '../../hooks/user.hook';
import { cssColors, darken } from '../../utils/color.utils';
import { toLocaleString } from '../../utils/date.utils';

export const DayView = () => {
  const { username, dayDate } = useParams();
  const user = useUser(username);
  const day = useDay(user, dayDate);

  const dayDateValue = useMemo(() => day ? toLocaleString(moment(day?.date).toDate()) : '-- -- ----', [day]);
  const bgColor = useMemo(() => day && cssColors(...day.emotions.map(emotion => darken(emotion.color, 0.2))), [day]);

  return (
    <div className="p-5 rounded-lg space-y-5" style={{ background: bgColor }}>
      <div className="flex justify-center">
        <h1 className="drop-shadow-xl shadow-black">{dayDateValue}</h1>
      </div>
      <div className="flex justify-around">
        {day?.emotions?.map((emotion, i) => (
          <EmotionBadge key={i} emotion={emotion} />
        ))}
      </div>
      <fieldset className="p-5 border rounded border-primary bg-dark">
        <legend className="px-2 rounded bg-primary">Résumé</legend>
        {day?.resume}
      </fieldset>
    </div>
  );
}
