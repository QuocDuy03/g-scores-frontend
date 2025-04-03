import React from "react";
import { Button } from "primereact/button";
import { Menu } from "lucide-react";

type HeaderProps = {
  toggleSideBar: () => void;
};

export const Header: React.FC<HeaderProps> = ({ toggleSideBar }) => {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <Button
        className="text-2xl hover:text-white ring-0"
        rounded
        text
        onClick={toggleSideBar}
      >
        <Menu />
        <span className="ml-2">Menu</span>
      </Button>
      <div className="text-3xl font-bold">G-Scores</div>
    </div>
  );
};
