import { SidebarAction } from './sidebar-action';

/** Sidebar component props */
export type SidebarProps = {
  collapsed?: boolean;
};

/** Sidebar component */
export const Sidebar = ({ collapsed }: SidebarProps = defaultProps) => {
  return (
    <div className="flex flex-col gap-4 p-2 bg-gray-500">
      <div className="flex flex-col items-center">
        <button>o</button>
        <span>DTY</span>
      </div>
      <div className="flex flex-col items-center">
        <SidebarAction icon="home" />
        <SidebarAction icon="face-grin-beam" />
        <SidebarAction icon="calendar-days" />
      </div>
    </div>
  );
}

const defaultProps: SidebarProps = {
  collapsed: false
}
