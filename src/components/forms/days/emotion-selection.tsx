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
            <button
              key={i}
              className={`px-2 py-1 ${textColor}`}
              style={{ backgroundColor: emotion.color }}
              onClick={() => onSelect(emotion)}
            >
              {emotion.name}
            </button>
          )
        })}
      </div>
      <div className="flex flex-col space-y-2 p-3">
        <span className="text-center">Sélectionnées</span>
        {selectedEmotions.map((emotion, i) => {
          const textColor = isLight(emotion.color) ? 'text-dark' : 'text-light';
          return (
            <button
              key={i}
              className={`px-2 py-1 ${textColor}`}
              style={{ backgroundColor: emotion.color }}
              onClick={() => onUnselect(emotion)}
            >
              {emotion.name}
            </button>
          )
        })}
      </div>
    </div>
  );
}
