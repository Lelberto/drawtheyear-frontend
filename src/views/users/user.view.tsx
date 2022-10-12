import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/user.hook';

export const UserView = () => {
  const { username } = useParams();
  const user = useUser(username);

  return (
    <div>User view : {user?.name}</div>
  );
};
