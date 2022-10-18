import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Emotion } from '../../../types/data.types';
import { isLight } from '../../../utils/color.utils';

type EmotionSelectionProps = {
  unselectedEmotions: Emotion[];
  selectedEmotions?: Emotion[];
  onSelect: (emotion: Emotion) => void;
  onUnselect: (emotion: Emotion) => void;
  onEdit: (emotion: Emotion) => void;
  onCreate: () => void;
}
export const EmotionSelection = ({ unselectedEmotions = [], selectedEmotions = [], onSelect, onUnselect, onEdit, onCreate }: EmotionSelectionProps) => {
  return (
    <div className="flex justify-center divide-x divide-primary">
      <div className="flex flex-col space-y-2 p-3">
        <span className="text-center">Non sélectionnées</span>
        {unselectedEmotions.map((emotion, i) => (
          <EmotionButton key={i} emotion={emotion} onSelect={onSelect} onEdit={onEdit} />
        ))}
        <button className="flex justify-between items-center px-2 py-1 gap-2 border border-light" onClick={onCreate}>
          <FontAwesomeIcon icon={faPlus} />
          Nouvelle émotion
        </button>
      </div>
      <div className="flex flex-col space-y-2 p-3">
        <span className="text-center">Sélectionnées</span>
        {selectedEmotions.map((emotion, i) => (
          <EmotionButton key={i} emotion={emotion} onSelect={onUnselect} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}

type EmotionButtonProps = {
  emotion: Emotion;
  onSelect: (emotion: Emotion) => void;
  onEdit: (emotion: Emotion) => void;
}
const EmotionButton = ({ emotion, onSelect, onEdit }: EmotionButtonProps) => {
  const textColor = isLight(emotion.color) ? 'text-dark' : 'text-light';
  return (
    <div className="flex justify-between px-2 py-1" style={{ backgroundColor: emotion.color }}>
      <button
        className={`flex-1 text-start ${textColor}`}
        onClick={() => onSelect(emotion)}
      >
        {emotion.name}
      </button>
      <button className="w-5 hover:opacity-50" onClick={() => onEdit(emotion)}>
        <FontAwesomeIcon icon={faEdit} className={textColor} />
      </button>
    </div>
  )
}
