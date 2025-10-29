"use client";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import { FaEyeSlash } from "react-icons/fa";
import logo_big from "../../assets/logo_big.png";
import background from "../../assets/background.jpg";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import useSignUp from "./useSignUp";
import { LoadingOverlay } from "../../components/ui/loading";
import ErrorOverlay from "../../components/ui/error";

const SignUp = () => {
  const {
    monthOptions,
    dateOptions,
    yearOptions,
    validatePassword,
    showPassword,
    setShowPassword,
    gender,
    setGender,
    setMonth,
    setDay,
    setYear,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    agree,
    setAgree,
    password,
    setPassword,
    checkField,
    handleSignUp,
    validDate,
    loading,
    errorMessage,
    error,
  } = useSignUp();
  // Custom Styles Select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      border: state.isFocused
        ? "0.125rem solid #10b981"
        : "0.0625rem solid #d1d5db",
      borderRadius: "0.75rem",
      padding: "0.375rem 0.125rem",
      color: "#374151",
      outline: "none",
      boxShadow: state.isFocused
        ? "0 0 0 0.1875rem rgba(16, 185, 129, 0.1)"
        : "none",
      "&:hover": {
        border: "0.125rem solid #10b981",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#10b981"
        : state.isFocused
        ? "#d1fae5"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      padding: "0.375rem 0.125rem",
      "&:hover": {
        backgroundColor: state.isSelected ? "#10b981" : "#d1fae5",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      maxHeight: "300px",
      overflow: "hidden",
      borderRadius: "0.75rem",
      boxShadow: "0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.1)",
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "300px",
      overflow: "auto",
      padding: "0.25rem",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "1rem",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#374151",
      fontSize: "1rem",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#374151",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#6b7280",
      "&:hover": {
        color: "#10b981",
      },
    }),
  };

  const { email } = useLocation().state || {};
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <div className="relative flex items-center pt-6 sm:pt-8 lg:pt-10 flex-1">
        <img
          src={background || "/placeholder.svg"}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-around py-8 sm:py-10 lg:py-12 w-full max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8 gap-6 lg:gap-8">
          {/* Logo */}
          <div className="flex items-center justify-center w-full lg:flex-[3] mb-6 lg:mb-0">
            <img
              src={logo_big || "/placeholder.svg"}
              className="w-3/4 sm:w-2/3 lg:w-[65%] max-w-md"
              alt="logo"
            />
          </div>

          {/* Form */}
          <div className="w-full max-w-md lg:max-w-xl lg:flex-[1] bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
            <form className="space-y-4 sm:space-y-5 lg:space-y-6">
              {/* Họ tên */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-700">
                    Tên
                  </label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Enter your profile name"
                    className={`w-full border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                      checkField && firstName === ""
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-700">
                    Họ
                  </label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Enter your profile name"
                    className={`w-full border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                      checkField && lastName === ""
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-700">
                  Giới tính của bạn là ?
                  {checkField && gender === "" ? (
                    <span className="ml-2 text-red-500">(*)</span>
                  ) : (
                    ""
                  )}
                </label>
                <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 mt-1 sm:mt-2">
                  <label className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500 w-4 h-4"
                      onClick={() => setGender("female")}
                    />
                    Nữ
                  </label>
                  <label className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500 w-4 h-4"
                      onClick={() => setGender("male")}
                    />
                    Nam
                  </label>
                  <label className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500 w-4 h-4"
                      onClick={() => setGender("other")}
                    />
                    Khác
                  </label>
                </div>
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-700">
                  Ngày sinh của bạn là ?
                  {checkField && validDate === false ? (
                    <span className="ml-2 text-red-500">
                      (Please fill correct date)
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <Select
                      options={monthOptions as any}
                      placeholder="Tháng"
                      styles={customStyles}
                      onChange={(e: any) => setMonth(e.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      options={dateOptions as any}
                      placeholder="Ngày"
                      styles={customStyles}
                      onChange={(e: any) => setDay(e.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      options={yearOptions as any}
                      placeholder="Năm"
                      styles={customStyles}
                      onChange={(e: any) => setYear(e.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base text-gray-700">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className={`w-full border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-14 sm:pr-16 ${
                      checkField && !validatePassword(password)
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {FaEyeSlash({ className: "w-4 h-4 sm:w-5 sm:h-5" })}
                    <span className="ml-1 text-xs sm:text-sm">
                      {showPassword ? "Ẩn" : "Hiện"}
                    </span>
                  </button>
                </div>
                <div className="text-gray-400 text-xs sm:text-sm mt-1">
                  Sử dụng 8 hoặc nhiều hơn ký tự với sự kết hợp của chữ cái, số
                  và ký tự đặc biệt
                  {checkField && !validatePassword(password) ? (
                    <span className="ml-2 text-red-500">(*)</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-2 sm:gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree((v) => !v)}
                  className="accent-green-500 mt-1 w-4 h-4 flex-shrink-0"
                />
                <label
                  className={`text-xs sm:text-sm ${
                    checkField && !agree ? "text-red-500" : "text-black"
                  }`}
                >
                  Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung
                  cho mục đích marketing.
                </label>
              </div>

              {/* Nút đăng ký */}
              <button
                type="button"
                onClick={() => handleSignUp(email as string)}
                disabled={loading}
                className="w-full py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white text-base sm:text-lg font-semibold mt-2 hover:opacity-90 transition"
              >
                Đăng ký
              </button>

              <ErrorOverlay visible={error} message={errorMessage} />
              <LoadingOverlay visible={loading} message="loading..." />

              {/* Đã có tài khoản */}
              <div className="text-center text-gray-500 text-xs sm:text-sm mt-2">
                Đã có tài khoản?
                <Link
                  to="/login"
                  className="ml-1 text-black underline hover:text-green-500"
                >
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
