import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/sections/Header";
import Dot from "../../components/ui/dot";
import { FaUsers } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiUsers } from "react-icons/hi2";
import Phone from "../../assets/phone.png";
import bgImage from "../../assets/background.jpg";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="pt-8 flex bg-cover bg-center h-full" style={{ backgroundImage: `url(${bgImage})` }}>
        <Dot />
        <div>
          <div className="mt-6 text-[106px] font-bold">BioLinker</div>
          <div className="w-[649px] h-[120pxx] text-[26px] font-helvetica text-[#565656] opacity-80 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </div>
          <button className="w-[252px] h-[90px] rounded-[60px] px-[40px] py-[18px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-helvetica font-bold text-[24px] leading-[14px] flex justify-center items-center">
            Start to Trial
          </button>
          <div className="flex justify-between items-center mt-12">
        <div className="flex gap-2">
          <button className="w-[97px] h-[97px] rounded-[28px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center">
            {FaUsers({ className: "text-[42px] text-white" })}
          </button>
          <div>
            <div className="font-bold text-[30px] font-helvetica mt-3">15k+</div>
            <div className="font-helvetica text-[15px]">Active user</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-[97px] h-[97px] rounded-[28px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center">
            {FiDownload({ className: "text-[42px] text-white" })}
          </button>
          <div>
            <div className="font-bold text-[30px] font-helvetica mt-3">5k+</div>
            <div className="font-helvetica text-[15px]">Total download</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-[97px] h-[97px] rounded-[28px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center">
            {HiUsers({ className: "text-[42px] text-white" })}
          </button>
          <div>
            <div className="font-bold text-[30px] font-helvetica mt-3">10k+</div>
            <div className="font-helvetica text-[15px]">Customer</div>
          </div>
        </div>
      </div>
        </div>
        <img
          src={Phone}
          alt="phone"
          className="w-auto h-[580px] ml-8"
          />
      </div>
    </div>
  );
};

export default Home;
