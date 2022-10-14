import { useParams } from 'react-router-dom';
import { Grid } from '../../components/grid/grid';
import { useUser } from '../../hooks/user.hook';

export const UserView = () => {
  const { username } = useParams();
  const user = useUser(username);

  return (
    <div className="m-8">
      <Grid user={user} />
    </div>
  );
}
