import { Outlet, useParams } from 'react-router-dom';
import { useUser } from '../hooks/user';

/** User page */
export const UserPage = () => {
  const params = useParams<'userId'>();
  const user = useUser(params.userId);

  return (
    <Outlet />
  );
}
