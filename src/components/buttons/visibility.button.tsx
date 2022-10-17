import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ButtonHTMLAttributes, useMemo } from 'react';
import { Day } from '../../types/data.types';

export type VisibilityButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  visibility?: Day['visibility'];
}
export const VisibilityButton = ({ className, visibility = 'private', ...props }: VisibilityButtonProps) => {
  const iconElement = useMemo(() => {
    switch (visibility) {
      case 'private':
      default: return (<FontAwesomeIcon icon={faUnlock} />);
      case 'public': return (<FontAwesomeIcon icon={faLock} />);
    }
  }, [visibility]);

  className = classNames(
    'flex justify-center',
    'w-10 h-10 p-2',
    'bg-dark',
    'border rounded-full',
    {
      'border-green-500': visibility === 'public',
      'border-red-500': visibility === 'private'
    },
    'text-xl',
    {
      'text-green-500': visibility === 'public',
      'text-red-500': visibility === 'private'
    },
    className
  );

  return (
    <button className={className} {...props}>
      {iconElement}
    </button>
  );
}
