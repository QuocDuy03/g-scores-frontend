import { Outlet } from "react-router-dom";
import { useBoolean } from "@/hooks";
import { Header, SideBar } from "./partials";

export function DefaultLayout() {
  const { value: sideBarVisible, toggle: toggleSideBar } = useBoolean(false);

  return (
    <div>
      <SideBar
        sideBarVisible={sideBarVisible}
        setSideBarVisible={toggleSideBar}
      />

      <div className="bg-[#eef3f8] min-h-screen">
        <Header toggleSideBar={toggleSideBar} />
        <Outlet />
      </div>
    </div>
  );
}
