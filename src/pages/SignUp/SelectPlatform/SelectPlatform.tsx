"use client";

import { useNavigate } from "react-router-dom";
import useSelectPlatform from "./useSelectplatform";
import { PLATFORM_ICONS } from "../../../constants/platformIcons";
import logo from "../../../assets/logo.png";
import { Button } from "../../../components/ui/button";

const SelectPlatform = () => {
  const {
    username,
    platforms,
    selectedPlatforms,
    togglePlatform,
    handleContinue,
    handleSkip,
    maxSelectedPlatforms,
    handleBack,
  } = useSelectPlatform();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Logo */}
        <div className="flex justify-center items-center h-full">
          <img
            src={logo || "/placeholder.svg"}
            className="h-10 sm:h-12 md:h-[49px]"
            alt="logo"
          />
        </div>
        {/* Welcome Message */}
        <div className="text-sm sm:text-base text-gray-600 font-medium">
          Welcome, {username}!
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex space-x-2">
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
            Những nền tảng mà bạn đang sử dụng?
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Chọn tối đa {maxSelectedPlatforms} để bắt đầu. Bạn có thể cập nhật
            bất cứ lúc nào.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-4xl mb-6 sm:mb-8 flex-1 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 animate-fadeInUp pb-4">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`
                  flex flex-col items-center justify-center px-3 sm:px-4 lg:px-6 py-4 sm:py-5 lg:py-6 rounded-xl border-2 transition-all duration-200
                  ${
                    selectedPlatforms.includes(platform)
                      ? "border-black bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                  ${
                    selectedPlatforms.length >= maxSelectedPlatforms &&
                    !selectedPlatforms.includes(platform)
                      ? "opacity-50"
                      : "cursor-pointer"
                  }
                `}
                disabled={
                  selectedPlatforms.length >= maxSelectedPlatforms &&
                  !selectedPlatforms.includes(platform)
                }
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-2">
                  {PLATFORM_ICONS[platform] || "Link"}
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-medium text-black text-center">
                  {platform}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selection Counter */}
        <div className="text-sm sm:text-base text-gray-500 mb-4">
          {selectedPlatforms.length} của {maxSelectedPlatforms} nền tảng đã chọn
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mt-auto border-t sm:border-t-0">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="order-2 sm:order-1 px-4 sm:px-6 py-3 text-base sm:text-lg hover:text-green-500 font-medium"
        >
          Quay lại
        </button>

        <Button
          onClick={handleContinue}
          className="order-1 sm:order-2 w-full sm:w-auto sm:flex-1 sm:max-w-md h-12 sm:h-14 bg-gradient-to-r from-green1 to-green2 text-white text-base sm:text-lg lg:text-xl rounded-full"
          disabled={selectedPlatforms.length === 0}
        >
          Tiếp tục
        </Button>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="order-3 px-4 sm:px-6 py-3 text-base sm:text-lg hover:text-green-500 font-medium"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
};

export default SelectPlatform;
