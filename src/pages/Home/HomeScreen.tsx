import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/sections/Header";
import Dot from "../../components/ui/dot";
import { FaUsers } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiUsers } from "react-icons/hi2";
import Phone from "../../assets/phone.png";
import bgImage from "../../assets/background.jpg";
import TubesCursor from "../../components/sections/banner/TubesCursor";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <TubesCursor />
      <div
        className="pt-8 mt-10 flex flex-col lg:flex-row items-center justify-between bg-cover bg-center flex-1 px-9 sm:px-16 lg:px-32"
        
      > 
      <span className="absolute inset-0 top-16 left-10 hidden md:visible lg:visible ">        
        <Dot />
      </span>

        {/* Left content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold">
            BioLinker
          </h1>

          <p className="mt-4 text-base sm:text-lg lg:text-xl font-helvetica text-white opacity-80 mb-6">
            Biolinker is a smart link-in-bio tool that helps users create a personalized landing page to showcase all their important links, social profiles, and content in one place. Perfect for creators, businesses, and influencers.
          </p>

          {/* Start Trial Button */}
          <button
            onClick={() => navigate("/trial")}
            className="w-full sm:w-64 h-16 sm:h-20 rounded-full px-6 py-3 bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-helvetica font-bold text-lg sm:text-xl flex justify-center items-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Start to Trial
          </button>

          {/* Stats Section */}
          <div className="text-white flex flex-wrap sm:flex-nowrap sm:flex-row justify-start gap-6 sm:gap-0 sm:justify-between md:items-center mt-12">
            {/* Active Users */}
            <div className="flex gap-3 items-center">
              <button className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                {FaUsers({ className:"text-2xl sm:text-3xl text-white"})}
              </button>
              <div>
                <div className="font-bold text-xl sm:text-2xl lg:text-3xl font-helvetica mt-2">
                  15k+
                </div>
                <div className="font-helvetica text-sm sm:text-base">
                  Active user
                </div>
              </div>
            </div>

            {/* Downloads */}
            <div className="flex gap-3 items-center">
              <button className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                {FiDownload({ className:"text-2xl sm:text-3xl text-white"})}
              </button>
              <div>
                <div className="font-bold text-xl sm:text-2xl lg:text-3xl font-helvetica mt-2">
                  5k+
                </div>
                <div className="font-helvetica text-sm sm:text-base">
                  Total download
                </div>
              </div>
            </div>

            {/* Customers */}
            <div className="flex gap-3 items-center">
              <button className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                {HiUsers({ className:"text-2xl sm:text-3xl text-white"})}
              </button>
              <div>
                <div className="font-bold text-xl sm:text-2xl lg:text-3xl font-helvetica mt-2">
                  10k+
                </div>
                <div className="font-helvetica text-sm sm:text-base">
                  Customer
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right phone image */}
        <img
          src={Phone}
          alt="phone"
          className="w-48 sm:w-72 lg:w-96 h-auto mt-10 lg:mt-0 animate-bounce-slow"
        />
      </div>
    </div>
  );
};

export default Home;
