import { RouteObject } from 'react-router-dom';
import { App } from '../app';
import GridView from '../views/grid-view';


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'grid',
        element: <GridView />
      }
    ]
  }
];
