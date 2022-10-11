import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMediaQuery } from '../../hooks/media-query.hook';
import { ChildrenProps } from '../../types/props.types';

export type NavbarProps = ChildrenProps;

export const Navbar = ({ children }: NavbarProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const mediaQuery = useGetMediaQuery();

  const toggleMenu = () => setShowMenu(!showMenu);

  const menuClassName = classNames({ 'block': showMenu, 'hidden': !showMenu });

  useEffect(() => setShowMenu(false), [mediaQuery]);

  return (
    <nav>
      <div className="px-4 border-b border-light">
        <div className="h-16 flex items-center justify-between">
          <div className="block sm:hidden">
            <button onClick={toggleMenu}>Menu</button>
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
                {children}
              </div>
            </div>
          </div>
          <div>
            <Link to="/login">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Profile picture"
                className="w-10 rounded-full"
              />
            </Link>
          </div>
        </div>
        <div className={menuClassName}>
          <div className="flex flex-col p-2 space-y-1">
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
}
