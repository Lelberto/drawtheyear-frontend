import { FC } from 'react';
import { Outlet } from 'react-router-dom';

/** Application page */
export const AppPage: FC = () => (
  <div>
    Connected !
    <Outlet />
  </div>
);
