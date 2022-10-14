import { Outlet } from 'react-router-dom';

export const UserView = () => {
  return (
    <div className="m-8">
      <Outlet />
    </div>
  );
}
