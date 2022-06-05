import { FC } from 'react';
import { AuthContextProvider } from './contexts/auth';
import { Router } from './router';

/** Application Component */
export const App: FC = () => (
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
);
