import { FC, useContext } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/auth';
import { AppPage } from './pages/app';
import { LoginPage } from './pages/login';
import { LoginSuccessPage } from './pages/login-success';

/** 
 * Router component
 * 
 * The router will be created depending on the authentication status.
 */
export const Router: FC = () => {
  const { authUser } = useContext(AuthContext);

  return authUser ? (
    <Routes>
      <Route path="/" element={<AppPage />} />
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
