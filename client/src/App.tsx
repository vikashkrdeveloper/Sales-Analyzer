import { NavLink, Route, Routes } from "react-router-dom";
import { TransctionsTable } from "./pages/transctions-table.tsx";
import { TransctionsStatistics } from "./pages/transctions-statistics.tsx";
import { BarChar } from "./pages/bar-char.tsx";
import { MenuIcon } from "./menu-icon.tsx";
import { CloseMenuIcon } from "./close-menu-icon.tsx";
import { useState } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className="w-full fixed z-50 top-0 left-0 bg-black h-[60px] flex gap-8 justify-center items-center text-[#FFFFFF] p-5 max-sm:pr-3">
        <div
          className={`flex gap-5 ${
            isMenuOpen
              ? "max-sm:flex max-sm:w-full max-sm:h-screen max-sm:p-5 max-sm:flex-col max-sm:absolute max-sm:top-[60px] max-sm:z-50 max-sm:bg-[#000]"
              : "max-sm:hidden "
          }`}
        >
          <NavLink to="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Home
          </NavLink>
          <NavLink
            to="/transctions/statistices"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {" "}
            Transctions Statistices
          </NavLink>
          <NavLink to="/bar-char" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {" "}
            Bar Char
          </NavLink>
        </div>
        <div className="w-full h-full sm:hidden flex justify-end items-center ">
          {isMenuOpen ? (
            <CloseMenuIcon setIsMenuOpen={setIsMenuOpen} />
          ) : (
            <MenuIcon setIsMenuOpen={setIsMenuOpen} />
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" Component={TransctionsTable} />
        <Route
          path="/transctions/statistices"
          Component={TransctionsStatistics}
        />
        <Route path="/bar-char" Component={BarChar} />
      </Routes>
    </>
  );
}

export default App;
