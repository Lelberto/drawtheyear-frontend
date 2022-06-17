import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEntryPoint } from '../hooks/entry-point.hook';
import { useHateoas } from '../hooks/hateoas.hook';
import { User } from '../types/data';
import { UsersResponse } from '../types/responses';

/**
 * User page
 * 
 * @path /user/`:username`
 */
export const UserPage = () => {
  const { username } = useParams<'username'>();
  const navigate = useNavigate();
  const hateoas = useHateoas();
  const { links } = useEntryPoint();
  const [user, setUser] = useState<User>();

  const fetchUser = useCallback(async () => {
    if (links.length) {
      const res = await hateoas.fetch<UsersResponse>(links, 'users');
      return res.data.users.find(user => user.username === username.toLowerCase());
    }
    return null;
  }, [links, username]);
  
  useEffect(() => {
    fetchUser().then((user) => setUser(user)).catch(console.error);
  }, [fetchUser]);
  
  const handleShowGrid = () => {
    navigate('grid');
  }

  return (
    <div>
      <button onClick={handleShowGrid} disabled={!hateoas.hasLink(user?._links, 'user-days')}>Show grid</button>
      <h1>{user?.username}</h1>
      <Outlet context={user} />
    </div>
  );
}
