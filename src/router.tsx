import { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/auth.context';
import { AppPage } from './pages/app.page';
import { DayPage } from './pages/day.page';
import { GridPage } from './pages/grid.page';
import { LoginSuccessPage } from './pages/login-success.page';
import { LoginPage } from './pages/login.page';
import { UserPage } from './pages/user.page';

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
        <Route path="user/:username" element={<UserPage />} >
          <Route path="grid" element={<GridPage />} />
          <Route path="day/:date" element={<DayPage />} />
        </Route>
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-success" element={<LoginSuccessPage />} />
    </Routes>
  );
}
