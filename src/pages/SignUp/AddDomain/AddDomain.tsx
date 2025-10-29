"use client";

import { Button } from "../../../components/ui/button";
import logo from "../../../assets/logo.png";
import useAddDomain from "./useAddDomain";
import { LoadingOverlay } from "../../../components/ui/loading";

const AddDomain = () => {
  const {
    domain,
    showError,
    navigate,
    handleContinue,
    handleBack,
    handleSkip,
    setDomain,
    setShowError,
    username,
    errorMessage,
    isLoading,
  } = useAddDomain();

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
          Chào mừng, {username}!
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex space-x-2">
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl space-y-6 sm:space-y-8 animate-fadeInUp">
          {/* Title */}
          <div className="text-center w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
              Tạo domain mới cho hồ sơ của bạn
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-2">
              Lời khuyên: Sử dụng như trên mạng xã hội của bạn{" "}
              <br className="hidden sm:block" />
              (chỉ miễn phí cho lần đầu tiên)
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 min-h-[100px] sm:min-h-[120px]">
            <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4">
              {/* Prefix */}
              <div className="bg-white border border-green-500 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg lg:text-xl text-green-500 text-center sm:text-left whitespace-nowrap">
                biolinker/
              </div>
              {/* Username Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Domain"
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    if (showError && e.target.value.trim() !== "") {
                      setShowError(false);
                    }
                  }}
                  className={`w-full bg-white border rounded-full px-4 sm:px-5 py-2 sm:py-3 text-base sm:text-lg lg:text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green1 focus:border-green1 ${
                    showError ? "border-red-500" : "border-green-500"
                  }`}
                />
                {showError && (
                  <span className="text-red-500 text-sm sm:text-base text-start pl-2 pt-2 block">
                    {errorMessage}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center items-center px-2">
            <Button
              onClick={handleContinue}
              className="w-full sm:w-[90%] lg:w-[80%] h-12 sm:h-14 bg-gradient-to-r from-green1 to-green2 text-white text-base sm:text-lg lg:text-xl rounded-full"
              disabled={domain.trim() === ""}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mt-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg hover:text-green-500 font-medium"
        >
          Quay lại
        </button>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg hover:text-green-500 font-medium"
        >
          Bỏ qua
        </button>
      </div>

      <LoadingOverlay visible={isLoading} />
    </div>
  );
};

export default AddDomain;
