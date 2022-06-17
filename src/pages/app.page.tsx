import { FC } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Application page
 * 
 * @path /
 */
export const AppPage: FC = () => (
  <div>
    <Outlet />
  </div>
);
