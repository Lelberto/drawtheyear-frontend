import { Grid } from '../components/grid/grid';
import { useAuth } from '../hooks/auth';

/** Grid page */
export const GridPage = () => {
  const { authUser } = useAuth(); // TODO Make user by /user/:userId/grid
  return (
    <Grid user={authUser} />
  );
}
