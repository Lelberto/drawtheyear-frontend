import { useParams, useSearchParams } from 'react-router-dom';
import { Grid } from '../../components/grid/grid';
import { useUser } from '../../hooks/user.hook';

export const UserView = () => {
  const { username } = useParams();
  const [query] = useSearchParams();
  const user = useUser(username);

  const getYear = () => {
    const year = parseInt(query.get('year'), 10);
    return isNaN(year) ? undefined : year;
  }

  return (
    <div className="m-8">
      <Grid user={user} year={getYear()} />
    </div>
  );
}
