"use client";

import { useEffect } from "react";
import useInformation from "./useInformation";
import { LoadingOverlay } from "../../../components/ui/loading";
const Information = () => {
  const {
    userData,
    checkUserData,
    name,
    setName,
    email,
    setEmail,
    description,
    setDescription,
    plan,
    handleSaveDetails,
    username,
    userImage,
    loading,
    error,
    fileInputRef,
    handleChangeImage,
  } = useInformation();
  useEffect(() => {
    checkUserData();
  }, []);
  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4 bg-[#F3F3F1] pb-6 sm:pb-8 lg:pb-10 mt-[3vh] h-full overflow-y-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-full sm:max-w-[85%] lg:max-w-[55%] mx-auto flex flex-col gap-3 sm:gap-4 w-full font-roboto text-[#4F4F4F]">
        {loading && (
          <LoadingOverlay visible={loading} message="Saving details..." />
        )}
        {/* personal information */}
        <div className="w-full gap-6 sm:gap-8 lg:gap-10 text-xl sm:text-2xl mt-4 sm:mt-5 lg:mt-6 text-black">
          <span className="text-xl sm:text-2xl font-bold">
            Thông tin cá nhân của tôi
          </span>
          <div className="flex flex-col rounded-2xl sm:rounded-3xl py-6 sm:py-7 lg:py-8 px-4 sm:px-5 lg:px-6 shadow-emerald-500/50 shadow-2xl mt-6 sm:mt-7 lg:mt-8 bg-white">
            {/* input field */}
            <div className="w-full gap-4 sm:gap-5 lg:gap-6 flex flex-col px-2 sm:px-3 lg:px-4">
              {/* email input field */}
              <div className="relative">
                <input
                  id="email"
                  type="text"
                  className="peer block w-full border-b border-gray-300 bg-transparent pt-2 pb-2 text-sm sm:text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 text-sm sm:text-base transition-all duration-500 origin-left
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-[65%] peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-[70%] peer-[&:not(:placeholder-shown)]:scale-75"
                >
                  Email
                </label>
              </div>

              {/* name input field */}
              <div className="relative mt-2">
                <input
                  id="name"
                  type="text"
                  className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-sm sm:text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                  placeholder="Tên hiển thị"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 text-sm sm:text-base transition-all duration-500 origin-left
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-[65%] peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-[70%] peer-[&:not(:placeholder-shown)]:scale-75"
                >
                  Tên hiển thị
                </label>
              </div>

              {/* description input field */}
              <div className="relative mt-2">
                <input
                  id="description"
                  type="text"
                  className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-sm sm:text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả về bản thân"
                />
                <label
                  htmlFor="description"
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 text-sm sm:text-base transition-all duration-500 origin-left
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-[65%] peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-[70%] peer-[&:not(:placeholder-shown)]:scale-75"
                >
                  Mô tả về bản thân
                </label>
              </div>

              <span className="text-sm sm:text-base font-medium text-start">
                Email của bạn không thể được thay đổi vì bạn đã đăng ký bằng tài
                khoản Google.
              </span>
            </div>
          </div>
          <button
            className="bg-[#EBEEF1] rounded-2xl sm:rounded-3xl px-4 sm:px-5 lg:px-6 py-3 sm:py-4 h-[55px] sm:h-[60px] lg:h-[65px] font-semibold mt-4 sm:mt-5 lg:mt-6 text-[#4F4F4F] text-sm sm:text-base"
            onClick={handleSaveDetails}
          >
            Lưu thông tin
          </button>
        </div>

        {/* change password */}
        <div className="w-full gap-6 sm:gap-8 lg:gap-10 text-xl sm:text-2xl mt-4 sm:mt-5 lg:mt-6">
          <span className="text-xl sm:text-2xl font-bold">
            Bảo mật và Quyền riêng tư
          </span>
          <div className="flex flex-col rounded-2xl sm:rounded-3xl py-6 sm:py-7 lg:py-8 px-4 sm:px-5 lg:px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-6 sm:mt-7 lg:mt-8">
            <span className="text-lg sm:text-xl font-medium text-start">
              Thay đổi mật khẩu
            </span>
            <span className="text-sm sm:text-base text-start mt-2">
              Bạn có thể thay đổi mật khẩu bằng cách nhấn nút bên dưới.
            </span>
            <button className="rounded-2xl sm:rounded-3xl border px-4 sm:px-5 lg:px-6 py-3 sm:py-4 h-[55px] sm:h-[60px] lg:h-[65px] font-semibold mt-4 sm:mt-5 lg:mt-6 text-[#4F4F4F] hover:bg-[#EBEEF1] text-sm sm:text-base">
              Thay đổi mật khẩu
            </button>
          </div>
        </div>

        {/*Account management*/}
        <div className="w-full gap-6 sm:gap-8 lg:gap-10 text-xl sm:text-2xl mt-4 sm:mt-5 lg:mt-6">
          <div className="text-xl sm:text-2xl font-bold">Quản lý tài khoản</div>
          <span className="text-lg sm:text-xl font-medium text-start mt-2">
            BioLinker là tài khoản của bạn
          </span>
          <div className="flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl py-6 sm:py-7 lg:py-8 px-4 sm:px-5 lg:px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-6 sm:mt-7 lg:mt-8 gap-4 lg:gap-0">
            {/* side bar image */}
            <button
              className="border-b lg:border-b-0 lg:border-r border-black pb-4 lg:pb-0 lg:pr-6 w-full lg:w-[20%] flex items-center lg:items-start justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={userImage || "/placeholder.svg"}
                alt="avatar"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full"
              />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleChangeImage(file);
                }
              }}
            />
            {/* side bar content */}
            <div className="flex flex-1 flex-col w-full lg:w-[70%]">
              <div className="px-2 sm:px-3 lg:px-4 pb-3 sm:pb-4 border-b border-black items-start">
                <span className="text-sm sm:text-base text-start">
                  {username}
                </span>
              </div>
              <div className="px-3 sm:px-4 lg:px-6 py-6 sm:py-7 lg:py-8 border-b border-black gap-3 sm:gap-4 text-sm sm:text-base text-start font-bold">
                <div className="">Gói dịch vụ:</div>
                <span className="text-green2">
                  {plan === "FREE-PLAN"
                    ? "Miễn phí"
                    : plan === "PRO-PLAN"
                    ? "Nâng cao"
                    : "Doanh nghiệp"}
                </span>
              </div>
              <div className="px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 text-center text-sm sm:text-base font-bold border-black flex flex-col items-center justify-center">
                <span className="">
                  Nâng cấp lên gói Nâng cao để mở khóa thêm chức năng trong
                  BioLinker
                </span>
                <button className="align-center gap-3 sm:gap-4 justify-center flex flex-row rounded-2xl sm:rounded-3xl border px-4 sm:px-5 lg:px-6 py-3 sm:py-4 w-full sm:w-[85%] lg:w-[70%] font-semibold mt-2 text-[#4F4F4F] bg-gradient-to-r from-green1 to-green2 text-white">
                  <span className="text-sm sm:text-base text-white font-semibold">
                    Nâng cấp gói
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* delete account */}
        <div className="w-full gap-6 sm:gap-8 lg:gap-10 text-xl sm:text-2xl mt-4 sm:mt-5 lg:mt-6">
          <div className="flex flex-col rounded-2xl sm:rounded-3xl py-6 sm:py-7 lg:py-8 px-4 sm:px-5 lg:px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-6 sm:mt-7 lg:mt-8">
            <span className="text-lg sm:text-xl font-medium text-start">
              Xóa tài khoản
            </span>
            <span className="text-sm sm:text-base text-start mt-2">
              Xóa tài khoản của bạn và tất cả các liên kết trong BioLinker.
            </span>
            <button className="rounded-2xl sm:rounded-3xl border border-red-500/80 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 h-[55px] sm:h-[60px] lg:h-[65px] font-semibold mt-4 sm:mt-5 lg:mt-6 text-red-500/80 hover:bg-red-500/10 text-sm sm:text-base">
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
