import { useSearchParams } from 'react-router-dom';

export const CreateDayView = () => {
  const [query] = useSearchParams();

  return (
    <div>{query.get('date')}</div>
  );
}
