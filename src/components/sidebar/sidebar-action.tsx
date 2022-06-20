import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

/** Sidebar action component props */
export type SidebarActionProps = {
  icon: FontAwesomeIconProps['icon'];
  onClick?: () => void;
}

/** Sidebar action component */
export const SidebarAction = ({ icon, onClick }: SidebarActionProps) => {
  return (
    <div>
      <button onClick={() => onClick && onClick()}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
}
