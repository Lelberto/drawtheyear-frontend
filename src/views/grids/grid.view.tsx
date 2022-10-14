import { useParams, Outlet } from 'react-router-dom';
import { Grid } from '../../components/grid/grid';
import { useUser } from '../../hooks/user.hook';

export const GridView = () => {
  const { username } = useParams();
  const user = useUser(username);
  
  return (
    <div>
      <Grid user={user} />
      <Outlet />
    </div>
  );
}
