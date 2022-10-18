import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config/config';
import { useGetMediaQuery } from '../../hooks/media-query.hook';
import { useAuthUser } from '../../hooks/user.hook';
import { User } from '../../types/data.types';
import { NavbarLink } from './navbar-link';

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const mediaQuery = useGetMediaQuery();
  const authUser = useAuthUser();

  const toggleMenu = () => setShowMenu(!showMenu);

  const menuClassName = classNames({ 'block': showMenu, 'hidden': !showMenu });

  useEffect(() => setShowMenu(false), [mediaQuery]);

  return (
    <nav>
      <div className="px-4 border-b border-primary/50">
        <div className="h-16 flex items-center justify-between">
          <div className="block sm:hidden">
            <button onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
                alt="Logo"
                className="w-10"
              />
            </div>
            <div className="hidden sm:block ml-6">
              <div className="flex space-x-4">
                {authUser ? (
                  <NavbarLink to={`/user/${authUser.username}/grid`}>Grille</NavbarLink>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div>
            {authUser ? <NavbarUserMenu user={authUser} /> : <NavbarLoginMenu />}
          </div>
        </div>
        <div className={menuClassName}>
          <div className="flex flex-col p-2 space-y-1">
            {authUser ? (
              <NavbarLink to={`/user/${authUser.username}/grid`}>Grille</NavbarLink>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

type NavbarUserMenuProps = {
  user: User;
}

const NavbarUserMenu = ({ user }: NavbarUserMenuProps) => (
  <Link to={`/user/${user.username}`}>
    <div className="flex gap-x-2 justify-center items-center">
      <span className="hidden sm:block">{user.name}</span>
      <img
        src={user.picture || config.users.defaultPicture}
        alt="Profile picture"
        className="w-10 rounded-full"
      />
    </div>
  </Link>
);

const NavbarLoginMenu = () => (
  <NavbarLink to="/login">Connexion / Inscription</NavbarLink>
);
