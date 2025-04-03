import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import { SideBarMenuItem } from "@/components";

import { PATH } from "@/utils/constants";

type SideBarProps = {
  sideBarVisible: boolean;
  setSideBarVisible: () => void;
};

export function SideBar({ sideBarVisible, setSideBarVisible }: SideBarProps) {
  const sideBarItemList = [
    {
      group: "Menu",
      items: [
        { path: PATH.dashboard, title: "Dashboard" },
        { path: PATH.search, title: "Search Scores" },
        { path: PATH.reports, title: "Reports" },
        { path: PATH.settings, title: "Settings" },
      ],
    },
  ];

  const sideBarItems = sideBarItemList.map((item) => ({
    template: (
      <SideBarMenuItem setSideBarVisible={setSideBarVisible} {...item} />
    ),
  }));

  return (
    <Sidebar
      showCloseIcon
      visible={sideBarVisible}
      modal
      onHide={setSideBarVisible}
      className="drop-shadow-sidebar"
      pt={{
        content: () => ({ className: "p-0" }),
      }}
    >
      <div className="w-full">
        <Menu model={sideBarItems} className="!w-full !border-0" />
      </div>
    </Sidebar>
  );
}
