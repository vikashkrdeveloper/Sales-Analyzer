import React from "react";

interface MenuIconProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsMenuOpen: Function;
}
export const MenuIcon: React.FC<MenuIconProps> = ({ setIsMenuOpen }) => {
  return (
    <div
      onClick={() => {
        setIsMenuOpen(true);
      }}
      className=" cursor-pointer text-[#FFF]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFF"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
    </div>
  );
};
