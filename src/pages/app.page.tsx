import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Timeline } from '../components/timeline/timeline';

/** Application page */
export const AppPage: FC = () => (
  <div>
    <Timeline />
    <Outlet />
  </div>
);
