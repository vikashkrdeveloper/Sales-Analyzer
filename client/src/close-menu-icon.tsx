import React from "react";

interface CloseMenuIconProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsMenuOpen: Function;
}
export const CloseMenuIcon: React.FC<CloseMenuIconProps> = ({
  setIsMenuOpen,
}) => {
  return (
    <div
      onClick={() => {
        setIsMenuOpen(false);
      }}
      className=" cursor-pointer text-[#FFF]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFFFF"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </div>
  );
};
