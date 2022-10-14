import { RouteObject } from 'react-router-dom';
import { App } from '../app';
import { CreateDayView } from '../views/days/create-day.view';
import { LoginCallbackView } from '../views/login/login-callback.view';
import { LoginFailureView } from '../views/login/login-failure.view';
import { LoginSuccessView } from '../views/login/login-success.view';
import { LoginView } from '../views/login/login.view';
import { DayView } from '../views/days/day.view';
import { UserView } from '../views/users/user.view';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginView />
      },
      {
        path: 'login/callback',
        element: <LoginCallbackView />
      },
      {
        path: 'login/success',
        element: <LoginSuccessView />
      },
      {
        path: 'login/failure',
        element: <LoginFailureView />
      },
      {
        path: 'user/:username',
        element: <UserView />,
        children: [
          {
            path: 'day/:dayDate',
            element: <DayView />
          }
        ]
      },
      {
        path: 'create-day',
        element: <CreateDayView />
      }
    ]
  }
];
