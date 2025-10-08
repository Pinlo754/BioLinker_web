
import React from "react";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import { FaEyeSlash } from "react-icons/fa";
import logo_big from "../../assets/logo_big.png";
import background from "../../assets/background.jpg";
import Select from 'react-select';
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
      error
    } = useSignUp();
    // Custom Styles Select
    const customStyles = {
      control: (provided: any, state: any) => ({
        ...provided,
        width: '100%',
        border: state.isFocused ? '0.125rem solid #10b981' : '0.0625rem solid #d1d5db',
        borderRadius: '0.75rem',
        padding: '0.375rem 0.125rem',
        color: '#374151',
        outline: 'none',
        boxShadow: state.isFocused ? '0 0 0 0.1875rem rgba(16, 185, 129, 0.1)' : 'none',
        '&:hover': {
          border: '0.125rem solid #10b981'
        }
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected 
          ? '#10b981' 
          : state.isFocused 
            ? '#d1fae5' 
            : 'white',
        color: state.isSelected ? 'white' : '#374151',
        padding: '0.375rem 0.125rem',
        '&:hover': {
          backgroundColor: state.isSelected ? '#10b981' : '#d1fae5'
        }
      }),
      menu: (provided: any) => ({
        ...provided,
        maxHeight: '300px', 
        overflow: 'hidden',
        borderRadius: '0.75rem',
        boxShadow: '0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.1)'
      }),
      menuList: (provided: any) => ({
        ...provided,
        maxHeight: '300px',
        overflow: 'auto',
        padding: '0.25rem'
      }),
      placeholder: (provided: any) => ({
        ...provided,
        color: '#6b7280',
        fontSize: '1rem'
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: '#374151',
        fontSize: '1rem'
      }),
      input: (provided: any) => ({
        ...provided,
        color: '#374151'
      }),
      indicatorSeparator: () => ({
        display: 'none'
      }),
      dropdownIndicator: (provided: any) => ({
        ...provided,
        color: '#6b7280',
        '&:hover': {
          color: '#10b981'
        }
      })
    };

  const { email } = useLocation().state || {};
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col ">
      <Header />
      <div className="relative flex items-center pt-10">
        <img 
          src={background} 
          alt="background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Container*/}

        <div className="relative flex flex-row md:flex-row items-center py-12 w-full max-w-7xl justify-around mx-auto z-10">
            
          {/* Logo*/}
          <div className="flex-[3] flex ml-10 items-center w-full mb-8 md:mb-0">
            <img
            src={logo_big}
            className="w-[65%]"
            alt="logo"
            />
          </div>

          {/* Form */}
          <div className="flex-[1] w-full min-w-[500px] max-w-xl bg-white rounded-2xl shadow-lg p-8 md:ml-10">
            <form className="space-y-6">

              {/* Họ tên */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700">Tên</label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Enter your profile name"
                    className={`w-full border  rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 ${checkField && firstName === "" ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700">Họ</label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"

                    placeholder="Enter your profile name"
                    className={`w-full border  rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 ${checkField && lastName === "" ? "border-red-500" : "border-gray-300"}`}

                  />
                </div>
              </div>

              {/* Email */}
              <div>

                <label className="block mb-1 text-gray-700">
                  Giới tính của bạn là ?
                  {checkField && gender === "" ? <span className=" ml-2 text-red-500">(*)</span> : ""}
                </label>
                <div className="flex gap-8 mt-1">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500"
                      onClick={() => setGender("female")}
                    />
                    Nữ
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500"
                      onClick={() => setGender("male")}
                    />
                    Nam
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500"
                      onClick={() => setGender("other")}
                    />
                    Khác
                  </label>
                </div>
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block mb-1 text-gray-700">Ngày sinh của bạn là ?
                  {checkField &&validDate === false ? <span className=" ml-2 text-red-500">(Please fill correct date)</span> : ""}
                </label>
                <div className="flex gap-4">
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
                <label className="block mb-1 text-gray-700">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"

                    className={`w-full border  rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-16 ${checkField && !validatePassword(password) ? "border-red-500" : "border-gray-300"}`}
                  ></input>

                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {FaEyeSlash({ className: "w-5 h-5" })}
                    <span className="ml-1 text-sm">{showPassword ? "Ẩn" : "Hiện"}</span>
                  </button>
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Sử dụng 8 hoặc nhiều hơn ký tự với sự kết hợp của chữ cái, số và ký tự đặc biệt

                  {checkField && !validatePassword(password) ? <span className=" ml-2 text-red-500">(*)</span> : ""}
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree((v) => !v)}
                  className="accent-green-500 mt-1"
                />

                <label className={`text-black text-sm ${checkField && !agree ? "text-red-500" : "text-black"}`}>

                  Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung cho mục đích marketing.
                </label>
              </div>

              {/* Nút đăng ký */}
              <button
                type="button"
                onClick={() => handleSignUp(email as string)}
                disabled={loading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white text-lg font-semibold mt-2 hover:opacity-90 transition"
              >
                Đăng ký
              </button>
              <ErrorOverlay visible={error} message={errorMessage} />
              <LoadingOverlay visible={loading} message="loading..." />
              {/* Đã có tài khoản */}
              <div className="text-center text-gray-500 text-sm mt-2">
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
}

export default SignUp;
