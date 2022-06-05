import { FC, useContext } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/auth';
import { AppPage } from './pages/app';
import { GridPage } from './pages/grid';
import { LoginPage } from './pages/login';
import { LoginSuccessPage } from './pages/login-success';
import { UserPage } from './pages/user';

/** 
 * Router component
 * 
 * The router will be created depending on the authentication status.
 */
export const Router: FC = () => {
  const { authUser } = useContext(AuthContext);

  return authUser ? (
    <Routes>
      <Route path="/" element={<AppPage />}>
        <Route path="user" element={<Outlet />}>
          <Route path=":userId" element={<UserPage />} >
            <Route path="grid" element={<GridPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="login-success" element={<LoginSuccessPage />} />
      </Route>
    </Routes>
  );
}
