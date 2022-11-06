import moment from 'moment';
import { useMemo } from 'react';
import { useParams, Outlet, useSearchParams } from 'react-router-dom';
import { Grid } from '../../components/grid/grid';
import { useUser } from '../../hooks/user.hook';

export const GridView = () => {
  const { username } = useParams();
  const [queryParams, setQueryParams] = useSearchParams({ year: moment().format('YYYY-MM-DD') })
  const user = useUser(username);
  const year = useMemo(() => parseInt(queryParams.get('year'), 10), [queryParams]);

  const updateYear = (newYear: number) => {
    setQueryParams({ year: newYear.toString(10) });
  }

  return (
    <div>
      <Grid
        user={user}
        year={parseInt(queryParams.get('year'), 10)}
        onPreviousYear={() => updateYear(year - 1)}
        onNextYear={() => updateYear(year + 1)}
      />
      <Outlet />
    </div>
  );
}
