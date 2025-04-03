import { Link, useLocation } from "react-router-dom";

type SideBarMenuItemProps = {
  group?: string;
  items: SideBarItemType[];
  setSideBarVisible: () => void;
};
type SideBarItemType = {
  path: string;
  title: string;
};
export const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({
  group,
  items,
  setSideBarVisible,
}) => {
  const location = useLocation();
  const isActive = items.some((item) => item.path === location.pathname);
  return (
    <div>
      {group && (
        <div className="py-2 pl-6 text-lg font-bold select-none text-partial-primary-700">
          {group}
        </div>
      )}
      {items.map((item) => (
        <Link
          className={`w-full flex gap-4 items-center pl-6 hover:bg-slate-100 py-3 text-md transition-all duration-75 ${
            isActive && "font-semibold text-black"
          }`}
          to={item.path}
          key={item.path}
          onClick={setSideBarVisible}
        >
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};
