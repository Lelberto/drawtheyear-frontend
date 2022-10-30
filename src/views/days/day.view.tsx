import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmotionBadge } from '../../components/badges/emotion.badge';
import { VisibilityButton } from '../../components/buttons/visibility.button';
import { EmotionSelection } from '../../components/forms/days/emotion-selection';
import { EditEmotionModal } from '../../components/modals/edit-emotion.modal';
import { useDayManager } from '../../hooks/day.hook';
import { useEmotionManager } from '../../hooks/emotion.hook';
import { useAuthUser, useUser } from '../../hooks/user.hook';
import { Day, Emotion } from '../../types/data.types';
import { cssColors, darken } from '../../utils/color.utils';
import { toLocaleString } from '../../utils/date.utils';

export const DayView = () => {
  const { username, dayDate } = useParams();
  const user = useUser(username);
  const authUser = useAuthUser();
  const emotionManager = useEmotionManager();
  const dayManager = useDayManager();
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [day, setDay] = useState<Day>();
  const [resumeEditMode, setResumeEditMode] = useState(false);
  const [currentEditingEmotion, setCurrentEditingEmotion] = useState<Emotion>();
  const [editEmotionModalShow, setEditEmotionModalShow] = useState(false);

  const isAuthUser = useMemo(() => user?.id === authUser?.id, [user, authUser]);
  const dayDateValue = useMemo(() => day ? toLocaleString(moment(day?.date).toDate()) : '-- -- ----', [day]);
  const bgColor = useMemo(() => day && cssColors(...day.emotions.map(emotion => darken(emotion.color, 0.2))), [day]);

  const toggleResumeEdit = () => {
    setResumeEditMode(!resumeEditMode);
  }

  const updateDayResume = (resume: string) => {
    if (user && day && day.resume !== resume) {
      dayManager.update(user, day, { resume }).catch(err => console.error('Could not update day :', err));
      refreshDay();
    }
  }

  const updateDayVisibility = () => {
    if (user && day) {
      let visibility: Day['visibility'] = day.visibility;
      switch (visibility) {
        case 'private':
        default:
          visibility = 'public';
          break;
        case 'public':
          visibility = 'private';
          break; 
      }
      dayManager.update(user, day, { visibility })
        .then(() => refreshDay())
        .catch(err => console.error('Could not update day :', err));
    }
  }

  const editEmotion = (emotion: Emotion) => {
    setCurrentEditingEmotion(emotion);
    setEditEmotionModalShow(true);
  }

  const createEmotion = () => {
    setCurrentEditingEmotion(null);
    setEditEmotionModalShow(true);
  }

  const saveEmotion = (data: Partial<Emotion>) => {
    let req;
    if (currentEditingEmotion) {
      req = emotionManager.update(currentEditingEmotion, data);
    } else {
      req = emotionManager.create(user, data);
    }
    req.then(() => {
      refreshEmotions();
      refreshDay();
    }).catch(err => console.error('Could not save emotion :', err));
    setEditEmotionModalShow(false);
  }

  const addEmotion = (emotion: Emotion) => {
    dayManager.addEmotion(user, day, emotion)
      .then(() => refreshDay())
      .catch(err => console.error('Could not add emotion :', err));
  }

  const removeEmotion = (emotion: Emotion) => {
    dayManager.removeEmotion(user, day, emotion)
      .then(() => refreshDay())
      .catch(err => console.error('Could not remove emotion :', err));
  }

  const refreshEmotions = () => {
    if (user) {
      emotionManager.find(user)
        .then(res => setEmotions(res.data))
        .catch(err => console.error('Could not find emotions :', err));
    }
  }

  const refreshDay = () => {
    if (user) {
      dayManager.findByDate(user, dayDate)
        .then(res => setDay(res.data))
        .catch(err => console.error('Could not find day :', err));
    }
  }

  useEffect(() => {
    refreshEmotions();
    refreshDay();
  }, [user, authUser]);

  return (
    <>
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
              onEdit={editEmotion}
              onCreate={createEmotion}
            />
          </div>
        </div>
      </div>
      <EditEmotionModal
        visible={editEmotionModalShow}
        emotion={currentEditingEmotion}
        onClose={() => setEditEmotionModalShow(false)}
        onSave={saveEmotion}
      />
    </>
  );
}
