import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Emotion } from '../../types/data.types';
import { EmotionBadge } from '../badges/emotion.badge';
import { Button } from '../buttons/button';
import { Modal } from './modal';

type EditEmotionFormValues = {
  name: string;
  color: string;
}

type EditEmotionModalProps = {
  visible?: boolean;
  emotion?: Emotion;
  onClose: () => void;
  onSave: (emotion: Partial<Emotion>) => void;
}

export const EditEmotionModal = ({ emotion, visible = false, onClose, onSave }: EditEmotionModalProps) => {
  const { register, setValue, handleSubmit } = useForm<EditEmotionFormValues>({
    defaultValues: {
      name: '',
      color: '#000000'
    }
  });

  useEffect(() => {
    setValue('name', emotion?.name);
    setValue('color', emotion?.color);
  }, [emotion]);

  const header = (
    <div className="flex justify-center">
      <h2>
        {emotion ? 'Modifier l\'émotion' : 'Nouvelle émotion'}
      </h2>
    </div>
  );
  
  const content = (
    <div className="space-y-5">
      <div className="flex justify-center">
        {emotion && <EmotionBadge emotion={emotion} />}
      </div>
      <div className="flex justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="name">Nom</label>
          <input id="name" type="text" placeholder="Nom de l'émotion" {...register('name')} />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="color">Couleur</label>
          <input id="color" type="color" {...register('color')} />
        </div>
      </div>
    </div>
  );

  const footer = (
    <div className="flex flex-row-reverse">
      <Button type="submit">Enregistrer</Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Modal
        header={header}
        content={content}
        footer={footer}
        visible={visible}
        onClose={onClose}
      />
    </form>
  );
}