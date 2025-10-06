"use client";

import { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const navItems = [
    { label: "Marketplace", path: "/marketplace" },
    { label: "Template", path: "/template" },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="bg-white shadow-md w-full px-4 md:px-8 py-2 fixed top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center">
          <img src={logo} alt="logo" className="h-12 md:h-14" />
        </button>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16 w-1/2 justify-center">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="font-helvetica text-base hover:text-green-600 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search box desktop */}
        <div className="hidden md:flex items-center w-96 h-11 rounded-full border border-gray-300 px-4 mr-14">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none font-helvetica text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button className="w-32 h-12 px-10 px-4 rounded-3xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center font-bold text-white">
            Support
          </Button>
          <button
            className="w-33 h-12 py-2 px-1 rounded-3xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center"
            onClick={() => navigate("/login")}
          >
            <div className="w-32 h-10 rounded-3xl px-10 py-4 bg-white font-helvetica font-bold text-md flex justify-center items-center">
              Login
            </div>
          </button>
          <button
            className="w-33 h-12 p-1 rounded-3xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center"
            onClick={() => navigate("/create-account")}
          >
            <div className="w-32 h-10 rounded-3xl px-auto py-4 bg-white font-helvetica font-bold text-md flex justify-center items-center">
              Sign Up
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-6 bg-white">
              
              <nav className="flex flex-col gap-4 mb-6">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="font-helvetica text-base text-left hover:text-green-600"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 border rounded-full px-4 py-2 outline-none text-sm font-helvetica"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>

              <div className="flex flex-col gap-3">
                <Button className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-bold w-full" 
                  onClick={() => navigate("/support")}>
                  Support
                </Button>
                <Button className="bg-white text-black border border-black font-bold w-full"
                  onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="bg-white text-black border border-black font-bold w-full"
                  onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
