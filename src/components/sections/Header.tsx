"use client";

import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import avatar from "../../assets/avatar.png";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState<any>(null);
  
  // Check user data mỗi lần render
  useEffect(() => {
    const checkUserData = () => {
      const user = localStorage.getItem("user");      
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          console.log(parsedUser);
          setUserData(parsedUser);
        } catch (error) {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    };

    // Check ngay lập tức
    checkUserData();
    
    // Listen for storage changes (khi user login/logout ở tab khác)
    const handleStorageChange = (e: any) => {
      if (e.key === "user") {
        checkUserData();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const navItems = [
    { label: "Template", path: "/marketplace" },
    { label: "Hỗ trợ", path: "/*" },
    { label: "Giới thiệu", path: "/about" },
  ];

  const handleHome = () => {
    if(userData === null){
      navigate("/");
    }
    else{
      navigate("/dashboard");      
    }
  }
  return (
    <header className="bg-white shadow-md w-full px-4 md:px-8 py-2 fixed top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        {userData === null ? (
        <button onClick={() => handleHome()} className="flex items-center">
          <img src={logo} alt="logo" className="h-12 md:h-14" />
        </button>
        ) : (
          <button onClick={() => handleHome()} className="flex items-center">
            <img src={logo} alt="logo" className="h-12 md:h-14" />
          </button>
        )}
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16 w-[40%] justify-center">
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
        {userData === null ? (
        <div className="hidden md:flex items-center gap-4">
          {/* <Button className="w-32 h-12 px-10 px-4 rounded-3xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center font-bold text-white">
            Support
          </Button> */}
          <button
            className="w-33 h-12 py-2 px-1 rounded-3xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center"
            onClick={() => navigate("/login")}
          >
            <div className="w-40 h-10 rounded-3xl px-6 py-4 bg-white font-helvetica font-bold text-md flex justify-center items-center">
              Đăng nhập
            </div>
          </button>
          <button
            className="w-40 h-12 p-1 rounded-3xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center"
            onClick={() => navigate("/create-account")}
          >
            <div className="w-40 h-10 rounded-3xl px-auto py-4 bg-white font-helvetica font-bold text-md flex justify-center items-center">
              Đăng ký
            </div>
          </button>
        </div>
        ) : (
          <div className=" w-[18%] flex items-center justify-between">
            <Button className="w-[70%] h-12 text-base px-8 rounded-3xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center font-bold text-white"
            onClick={() => {
              sessionStorage.removeItem("profileData");
              navigate('/bio-edit')
            }}>
              Tạo hồ sơ mới
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden p-0 flex items-center justify-center">
                  <img src={userData.userImage} alt="avatar" className="w-full h-full object-cover rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuItem className="font-helvetica text-base hover:bg-green-100" onSelect={() => navigate("/account")}>Thông tin</DropdownMenuItem>
                <DropdownMenuItem className="font-helvetica text-base hover:bg-green-100" onSelect={() => navigate("/my-collection")}>Bộ sưu tập</DropdownMenuItem>
                <DropdownMenuItem
                  className="font-helvetica text-base hover:bg-green-100"
                  variant="destructive"
                  onSelect={() => {
                    localStorage.removeItem("user");
                    navigate("/logout");
                  }}
                >
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

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
