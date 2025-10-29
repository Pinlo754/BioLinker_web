import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useGetStarted from "./useGetStarted";
import { Button } from "../../components/ui/button";

const Getstarted = () => {
  const navigate = useNavigate();
  const { options, handleBack, handleContinue, handleSkip } = useGetStarted();
  const { username } = useLocation().state || {};

  return (
    <div className="min-h-screen bg-white overflow-hidden font-normal font-['Helvetica'] flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <button
          className="flex justify-center items-center mb-2 sm:mb-0"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-[45px] sm:h-[49px]" alt="logo" />
        </button>

        {/* Welcome Message */}
        <div className="text-gray-600 font-medium text-sm sm:text-base">
          Chào mừng, {username}!
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 mt-2">
        <div className="flex space-x-1 sm:space-x-2">
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Title */}
      <h1 className="mt-4 sm:mt-6 text-center font-bold leading-tight text-2xl sm:text-3xl md:text-4xl text-[#4F4F4F] px-4 sm:px-6">
        Mục đích sử dụng BioLinker của bạn là?
      </h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-6 w-full max-w-6xl mx-auto px-4 sm:px-0">
        {options.map((opt, index) => (
          <button
            key={index}
            className="bg-white rounded-2xl shadow-[0_0.25rem_0.625rem_0.125rem_rgba(108,223,171,0.5)] p-4 h-44 sm:h-32 flex flex-col justify-center text-left"
            onClick={() => handleContinue(opt.title)}
          >
            <span className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] bg-clip-text text-transparent text-md sm:text-2xl mb-1 sm:mb-2 break-words">
              {opt.title}
            </span>
            <span className="text-zinc-800 text-xs sm:text-lg break-words">
              {opt.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Getstarted;
