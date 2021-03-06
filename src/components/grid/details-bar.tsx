import React from 'react';
import { DayData, UserData } from '../../util/types/data-types';
import utils from '../../util/utils';
import { Badge } from '../badge';
import { Button } from '../button';
import { Icon } from '../icon';

/**
 * Details sidebar props.
 */
export interface DetailsBarProps {
  user: UserData;
  day: DayData;
  editable?: boolean;
  onShouldClose?(): void;
  onPreviousClick?(day: DayData): void;
  onNextClick?(day: DayData): void;
}

/**
 * Details sidebar component.
 * 
 * This component shows a day details.
 * 
 * @param user Details owner
 * @param day Day to show
 * @param editable True if the details sidebar is editable
 * @param onShouldClose When the sidebar shoulds close
 * @param onPreviousClick When the previous day arrow is clicked
 * @param onNextClick When the next day arrow is clicked
 */
export const DetailsBar: React.FC<DetailsBarProps> = ({ user, day, editable, onShouldClose, onPreviousClick, onNextClick }) => {

  const getDateName = () => {
    const date = new Date(day.date);
    return `${date.getDate()} ${utils.monthMap.get(date.getMonth())} ${date.getFullYear()}`;
  }

  return (
    <div className="fixed top-2/3 w-full h-1/3 z-20 bg-secondary-dark shadow-big rounded-t-lg">
      <div className="m-2 flex justify-between">
        <Icon type="event_note" />
        <div className="flex justify-center items-center">
          <h1 className="order-2 text-lg lg:text-xl">Détails du {getDateName()}</h1>
          <Button className="order-1" onClick={() => onPreviousClick(day)}>
            <Icon type="keyboard_arrow_left" />
          </Button>
          <Button className="order-3" onClick={() => onNextClick(day)}>
            <Icon type="keyboard_arrow_right" />
          </Button>
        </div>
        <Button onClick={onShouldClose}>
          <Icon type="close" />
        </Button>
      </div>
      <div className="px-5">
        <div className="flex flex-wrap justify-center gap-4 content-center">
          {day.emotions.map((emotion, i) => (
            <Badge key={i} style={{ backgroundColor: emotion.color }}>{emotion.name}</Badge>
          ))}
        </div>
        <div className="m-2 p-2 border-secondary-light border-2">
          <p className="text-justify clamp-3">{day.description || 'Aucune description'}</p>
        </div>
        {editable && (
          <div className="m-2 flex justify-between">
            <Button className="bg-primary-dark hover:bg-primary" href={`/grid/${user.name}/day/${day.date}`}>Voir tous les détails</Button>
            <Button className="bg-primary-dark hover:bg-primary" href={`/grid/${user.name}/day/${day.date}/modify`}>Modifier</Button>
          </div>
        )}
      </div>
    </div>
  );
}

DetailsBar.defaultProps = {
  editable: false
}
