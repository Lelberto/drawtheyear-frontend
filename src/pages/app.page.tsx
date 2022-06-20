import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/sidebar';

/**
 * Application page
 * 
 * @path /
 */
export const AppPage = () => (
  <>
    <div className="flex">
      <div className="flex-none">
        <Sidebar />
      </div>
    </div>
    <Outlet />
  </>
);
