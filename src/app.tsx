import { Outlet } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { AuthProvider } from './contexts/auth.context';

export const App = () => (
  <AuthProvider>
    <div className="md:container md:mx-auto">
      <div className="sticky top-0 z-40 backdrop-blur">
        <Navbar />
      </div>
      {/* Test section */}
      {/* Test section */}
      <div className="m-8">
        <Outlet />
      </div>
    </div>
  </AuthProvider>
);
