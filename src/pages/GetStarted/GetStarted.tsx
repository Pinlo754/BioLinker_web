import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useGetStarted from "./useGetStarted";
import { Button } from "../../components/ui/button";

const Getstarted = () => {
  const navigate = useNavigate();
  const { options, handleBack, handleContinue, handleSkip } = useGetStarted();
  const { username } = useLocation().state || {};
  return (
    <div className="min-h-screen bg-white  overflow-hidden font-normal font-['Helvetica']">
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <button className="flex justify-center items-center h-full">
              <img
                src={logo}
                className="h-[49px]"
                alt="logo"
                onClick={() => navigate("/")}
              />
          </button>
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto px-6 align-middle">
              <div className="flex space-x-2">
                <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
                <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
                <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
                <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
              </div>
          </div>
          
          {/* Welcome Message */}
          <div className="text-gray-600 font-medium">
              Chào mừng, {username}!
          </div>
      </div>

      {/* Title */}
      <h1 className="mt-2 text-center font-bold leading-tight font-['Helvetica'] text-3xl md:text-4xl text-[#4F4F4F]">
        Mục đích sử dụng BioLinker của bạn là?
      </h1>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-8 w-full max-w-6xl  mx-auto">
        {options.map((opt, index) => (
          <button
            key={index}
            className="bg-white rounded-2xl shadow-[0_0.25rem_0.625rem_0.125rem_rgba(108,223,171,0.5)] p-4 h-32 flex flex-col justify-center text-left"
            onClick={() => handleContinue(opt.title)}
          >
            <span className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] bg-clip-text text-transparent text-2xl md:text-3xl mb-2">
              {opt.title}
            </span>
            <span className="text-zinc-800 text-lg md:text-xl">
              {opt.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Getstarted;
