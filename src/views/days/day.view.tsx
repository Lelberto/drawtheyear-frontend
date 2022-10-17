import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmotionBadge } from '../../components/badges/emotion.badge';
import { VisibilityButton } from '../../components/buttons/visibility.button';
import { EmotionSelection } from '../../components/forms/days/emotion-selection';
import { useDay } from '../../hooks/day.hook';
import { useEmotions } from '../../hooks/emotion.hook';
import { useAuthUser, useUser } from '../../hooks/user.hook';
import { Day } from '../../types/data.types';
import { cssColors, darken } from '../../utils/color.utils';
import { toLocaleString } from '../../utils/date.utils';

export const DayView = () => {
  const { username, dayDate } = useParams();
  const user = useUser(username);
  const authUser = useAuthUser();
  const { day, updateDay, addEmotion, removeEmotion } = useDay(user, dayDate);
  const emotions = useEmotions(user);
  const [resumeEditMode, setResumeEditMode] = useState(false);

  const isAuthUser = useMemo(() => user?.id === authUser?.id, [user, authUser]);
  const dayDateValue = useMemo(() => day ? toLocaleString(moment(day?.date).toDate()) : '-- -- ----', [day]);
  const bgColor = useMemo(() => day && cssColors(...day.emotions.map(emotion => darken(emotion.color, 0.2))), [day]);

  const toggleResumeEdit = () => {
    setResumeEditMode(!resumeEditMode);
  }

  const updateDayResume = (resume: string) => {
    if (day && day.resume !== resume) {
      updateDay({ resume });
    }
  }

  const updateDayVisibility = () => {
    let visibility: Day['visibility'] = day?.visibility;
    switch (visibility) {
      case 'private':
      default:
        visibility = 'public';
        break;
      case 'public':
        visibility = 'private';
        break; 
    }
    updateDay({ visibility });
  }

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-lg space-y-5" style={{ background: bgColor }}>
        <div className="flex justify-between items-center">
          <div className="w-24 h-16">
            <h4>{user?.name}</h4>
          </div>
          <div className="h-16">
            <h1 className="drop-shadow-xl shadow-black">{dayDateValue}</h1>
          </div>
          <VisibilityButton
            visibility={day?.visibility}
            onClick={() => updateDayVisibility()}
            disabled={!isAuthUser}
          />
        </div>
        <div className="flex flex-wrap justify-around gap-2">
          {day?.emotions?.map((emotion, i) => (
            <EmotionBadge key={i} emotion={emotion} />
          ))}
        </div>
        <div className="relative p-5 border rounded-md border-primary bg-dark text-justify">
          <span className="absolute left-5 -top-3 px-2 rounded bg-primary">Résumé</span>
          {
            resumeEditMode ? (
              <textarea
                className="inline-block w-full bg-dark resize-y"
                defaultValue={day?.resume}
                autoFocus
                onBlur={e => {
                  updateDayResume(e.target.value);
                  toggleResumeEdit()
                }}
              />
            ) : (
              <p>{day?.resume}</p>
            )
          }
          {isAuthUser && (
            <button className="absolute right-5 -top-3 px-2 rounded bg-dark" onClick={toggleResumeEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
        </div>
      </div>
      <div className="flex max-h-128 space-x-2">
        <div className="flex-auto p-2 border border-light rounded space-y-2">
          <h4 className="text-center">Votre journée</h4>
          <h5 className="text-secondary text-center font-bold">Coming Soon</h5>
        </div>
        <div className="p-2 border border-light rounded space-y-2 overflow-y-scroll">
          <h4 className="text-center">Émotions</h4>
          <EmotionSelection
            unselectedEmotions={emotions.filter(emotion => !day?.emotions?.map(emotion => emotion.id).includes(emotion.id))}
            selectedEmotions={day?.emotions}
            onSelect={addEmotion}
            onUnselect={removeEmotion}
          />
        </div>
      </div>
    </div>
  );
}
