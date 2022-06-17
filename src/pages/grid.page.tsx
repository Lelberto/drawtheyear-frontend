import { useUser } from '../hooks/user.hook';

/**
 * Grid page
 * 
 * @path /user/`:username`/grid
 */
export const GridPage = () => {
  const user = useUser();
  return (
    <>{user?.name}</>
    // <Grid user={authUser} />
  );
}
