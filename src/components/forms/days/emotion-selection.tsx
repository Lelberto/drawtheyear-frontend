import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Emotion } from '../../../types/data.types';
import { isLight } from '../../../utils/color.utils';

type EmotionSelectionProps = {
  unselectedEmotions: Emotion[];
  selectedEmotions?: Emotion[];
  onSelect: (emotion: Emotion) => void;
  onUnselect: (emotion: Emotion) => void;
}
export const EmotionSelection = ({ unselectedEmotions = [], selectedEmotions = [], onSelect, onUnselect }: EmotionSelectionProps) => {
  return (
    <div className="flex justify-center divide-x divide-primary">
      <div className="flex flex-col space-y-2 p-3">
        <span className="text-center">Non sélectionnées</span>
        {unselectedEmotions.map((emotion, i) => {
          const textColor = isLight(emotion.color) ? 'text-dark' : 'text-light';
          return (
            <div key={i} className="flex justify-between px-2 py-1" style={{ backgroundColor: emotion.color }}>
              <button
                className={`flex-1 text-start ${textColor}`}
                onClick={() => onSelect(emotion)}
              >
                {emotion.name}
              </button>
              <button>
                <FontAwesomeIcon icon={faEdit} className={textColor} />
              </button>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col space-y-2 p-3">
        <span className="text-center">Sélectionnées</span>
        {selectedEmotions.map((emotion, i) => {
          const textColor = isLight(emotion.color) ? 'text-dark' : 'text-light';
          return (
            <div key={i} className="flex justify-between px-2 py-1" style={{ backgroundColor: emotion.color }}>
              <button
                className={`flex-1 text-start ${textColor}`}
                onClick={() => onUnselect(emotion)}
              >
                {emotion.name}
              </button>
              <button>
                <FontAwesomeIcon icon={faEdit} className={textColor} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
