import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"
const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[91px] bg-white w-full px-[60px] items-center justify-between shadow-md">
      <button className="flex justify-center items-center h-full">
        <img
          src={logo}
          className="h-[49px]"
          alt="logo"
          onClick={() => navigate("/")}
        />
      </button>
      <div className="flex justify-between items-center h-full w-[35%] px-[80px]">
        <button
          className="font-helvetica"
          onClick={() => navigate("/marketplace")}
        >
          Marketplace
        </button>
        <button
          className="font-helvetica"
          onClick={() => navigate("/template")}
        >
          Template
        </button>
        <button className="font-helvetica" onClick={() => navigate("/about")}>
          About
        </button>
      </div>

      <div className="w-[300px] h-[44px] rounded-[100px] border border-gray-300 flex items-center justify-between px-[30px]">
        <input
          type="text"
          placeholder="Search"
          className="font-helvetica text-[14px] outline-none bg-transparent flex-1"
        />
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </div>
      <div className="flex justify-between items-center w-[30%] ml-[30px]">
        <button className="w-[138px] h-[44px] rounded-[60px] px-[40px] py-[18px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-helvetica font-bold text-[14px] leading-[14px] flex justify-center items-center">
          Support
        </button>
        <button className="w-[125px] h-[44px] rounded-[60px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center">
          <div className="w-[121px] h-[40px] rounded-[64px] px-[40px] py-[18px] bg-white font-helvetica font-bold text-[14px] leading-[14px] flex justify-center items-center">
            Login
          </div>
        </button>
        <button className="w-[125px] h-[44px] rounded-[60px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center">
          <div className="w-[121px] h-[40px] rounded-[64px] px-[22px] py-[18px] bg-white font-helvetica font-bold text-[14px] leading-[14px] flex justify-center items-center">
            Sign Up
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
