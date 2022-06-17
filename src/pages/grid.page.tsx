import { Grid } from '../components/grid/grid';
import { useUser } from '../hooks/user.hook';

/**
 * Grid page
 * 
 * @path /user/`:username`/grid
 */
export const GridPage = () => {
  const user = useUser();
  
  return (
    <div>
      <Grid user={user} />
    </div>
  );
}
