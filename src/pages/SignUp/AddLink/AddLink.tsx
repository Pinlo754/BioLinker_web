"use client";

import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAddLink from "./useAddLink";
import { PLATFORM_ICONS } from "../../../constants/platformIcons";
import { Button } from "../../../components/ui/button";

const AddLink = () => {
  const navigate = useNavigate();
  const {
    username,
    platforms = [],
    platformLink,
    updatePlatformValue,
    clearPlatformValue,
    additionalLinks,
    updateAdditionalLink,
    handleContinue,
    handleSkip,
    handleBack,
  } = useAddLink();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Logo */}
        <button className="flex justify-center items-center h-full">
          <img
            src={logo || "/placeholder.svg"}
            className="h-10 sm:h-12 md:h-[49px]"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </button>

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
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto scrollbar-hide animate-fadeInUp">
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-3">
            Thêm liên kết của bạn
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Hoàn thành các trường bên dưới để thêm nội dung của bạn vào hồ sơ
            mới của bạn.
          </p>
        </div>

        {/* Your selections */}
        {platforms.length > 0 && (
          <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl mb-6 sm:mb-8">
            <h2 className="text-sm sm:text-base font-semibold text-black mb-3 sm:mb-4 px-2">
              Các nền tảng mà bạn đang sử dụng
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {platforms.map((name: string) => (
                <div
                  key={name}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border border-gray-200 rounded-xl"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    {PLATFORM_ICONS[name] || PLATFORM_ICONS["Link"]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      className="w-full outline-none text-sm sm:text-base"
                      placeholder={`${name}.com/username`}
                      value={platformLink?.[name] ?? ""}
                      onChange={(e) =>
                        updatePlatformValue(name, e.target.value)
                      }
                    />
                    <div className="text-xs text-gray-400 truncate">{`${name.toLowerCase()}.com/username`}</div>
                  </div>
                  {platformLink?.[name] && (
                    <button
                      className="text-gray-400 hover:text-black flex-shrink-0 p-1"
                      onClick={() => clearPlatformValue(name)}
                      aria-label={`Clear ${name}`}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional links */}
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl mb-6">
          <h2 className="text-sm sm:text-base font-semibold text-black mb-3 sm:mb-4 px-2">
            Các liên kết thêm
          </h2>
          <div className="space-y-3">
            {additionalLinks.map((val, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border border-gray-200 rounded-xl"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
                  {PLATFORM_ICONS["Link"]}
                </div>
                <input
                  className="flex-1 outline-none text-sm sm:text-base min-w-0"
                  placeholder="url"
                  value={val}
                  onChange={(e) => updateAdditionalLink(idx, e.target.value)}
                />
              </div>
            ))}
          </div>
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
          className="order-1 sm:order-2 w-full sm:w-auto sm:flex-1 sm:max-w-md h-12 sm:h-14 bg-gradient-to-r from-green1 to-green2 text-white text-base sm:text-lg rounded-full"
          disabled={
            Object.values(platformLink || {}).some((value) => value === "") ||
            additionalLinks.length === 0
          }
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

export default AddLink;
