"use client";
import useCreateName from "./useCreateName";
import logo from "../../../assets/logo.png";
import { Button } from "../../../components/ui/button";
import avatar from "../../../assets/avatar.png";
import ErrorOverlay from "../../../components/ui/error";
import { LoadingOverlay } from "../../../components/ui/loading";

const CreateNameBio = () => {
  const {
    username,
    navigate,
    handleBack,
    handleContinue,
    displayName,
    setDisplayName,
    avatarUrl,
    fileInputRef,
    error,
    description,
    setDescription,
    setAvatarFile,
    setAvatarUrl,
    loading,
    backgroundUrl,
    setBackgroundUrl,
    backgroundFileInputRef,
    setBackgroundFile,
  } = useCreateName();

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
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
          <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fadeInUp overflow-y-auto scrollbar-hide">
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black mb-2 sm:mb-3">
            Thêm chi tiết hồ sơ của bạn
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Thêm ảnh đại diện, tên, và mô tả của bạn.
          </p>
        </div>

        {/* Background banner + Avatar uploader */}
        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-2xl mb-12 sm:mb-16 lg:mb-20">
          {/* Background banner */}
          <div className="relative w-full h-32 sm:h-40 lg:h-48 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
            {backgroundUrl ? (
              <img
                src={backgroundUrl || "/placeholder.svg"}
                className="w-full h-full object-cover"
                alt="Background"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm sm:text-base">
                Thêm ảnh nền
              </div>
            )}
            <button
              type="button"
              className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center z-20 text-lg sm:text-xl"
              onClick={() => backgroundFileInputRef.current?.click()}
              aria-label="Upload background"
            >
              +
            </button>
            <input
              ref={backgroundFileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setBackgroundFile(file);
                setBackgroundUrl(url);
              }}
              className="hidden"
            />
          </div>

          {/* Avatar overlaid at bottom-center */}
          <div className="absolute -bottom-10 sm:-bottom-12 lg:-bottom-14 left-1/2 -translate-x-1/2 z-10">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
              {avatarUrl ? (
                <img
                  src={avatarUrl || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              ) : (
                <img
                  width="100%"
                  height="100%"
                  src={avatar || "/placeholder.svg"}
                  alt="user-male-circle"
                />
              )}
            </div>
            <button
              type="button"
              className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-white flex items-center justify-center text-sm sm:text-base"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload avatar"
            >
              +
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setAvatarFile(file);
                setAvatarUrl(url);
              }}
              className="hidden"
            />
          </div>
        </div>

        {/* Display Name */}
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl mb-4 sm:mb-5">
          <div className="p-3 sm:p-4 border border-gray-200 rounded-xl">
            <input
              className="w-full outline-none text-sm sm:text-base"
              placeholder="Tên hiển thị"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl mb-6">
          <div className="p-3 sm:p-4 border border-gray-200 rounded-xl">
            <textarea
              className="w-full outline-none resize-none text-sm sm:text-base"
              placeholder="Mô tả bản thân trong 160 ký tự hoặc ít hơn"
              rows={4}
              maxLength={160}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-xs text-gray-400 text-right">
              {description.length}/160
            </div>
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
          className="order-1 sm:order-2 w-full sm:w-auto sm:flex-1 sm:max-w-md h-12 sm:h-14 bg-gradient-to-r from-green1 to-green2 text-white text-base sm:text-lg lg:text-xl rounded-full"
          disabled={!displayName}
        >
          Tiếp tục
        </Button>

        {/* Skip Button */}
        <button
          onClick={handleContinue}
          className="order-3 px-4 sm:px-6 py-3 text-base sm:text-lg hover:text-green-500 font-medium"
        >
          Bỏ qua
        </button>
      </div>

      {error && <ErrorOverlay visible={error} />}
      {loading && <LoadingOverlay visible={loading} message="Đang tải dữ liệu..." />}
    </div>
  );
};

export default CreateNameBio;
