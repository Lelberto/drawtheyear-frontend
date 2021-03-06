import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Icon } from '../icon';
import { NavMenu } from './nav-menu';

/**
 * Navbar component.
 */
export const Navbar: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const { authUser, setAuthUser } = useContext(AuthenticationContext);

  const handleDisconnect = () => {
    setAuthUser(null);
    localStorage.clear();
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary-dark shadow-big rounded-b-md">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link className="waves-effect" to="/" href="#">
                <h1 className="text-2xl md:text-4xl font-primary">DrawTheYear</h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <NavMenu />
            </div>
          </div>
          <div className="flex items-center">
            {authUser ? (
              <Button onClick={handleDisconnect}>Déconnexion</Button>
            ) : (
              <Button href="/signin">Connexion</Button>
            )}
            <div className="md:hidden flex items-center">
              <Button onClick={() => setDropdown(!dropdown)}>
                <Icon type='dehaze' />
              </Button>
            </div>
          </div>
        </div>
        {dropdown && (
          <div className="md:hidden">
            <NavMenu list />
          </div>
        )}
      </div>
    </nav>
  );
}
