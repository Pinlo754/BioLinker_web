import React, { useState } from "react";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import { FaEyeSlash } from "react-icons/fa";
import logo_big from "../../assets/logo_big.png";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(true);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col ">
      <Header />
      <div className="flex items-center  bg-gradient-to-r from-green1 to-green2">

        {/* Container*/}

        <div className=" flex flex-row md:flex-row items-center py-12 w-full max-w-7xl justify-around mx-auto ">
            
          {/* Logo*/}
          <div className="flex-[3] flex justify-center items-center w-full mb-8 md:mb-0">
            <img
            src={logo_big}
            className="h-[333px]"
            alt="logo"
            />
          </div>

          {/* Form */}
          <div className="flex-1 w-full min-w-[500px] max-w-md bg-white rounded-2xl shadow-lg p-8 md:ml-20">
            <form className="space-y-4">

              {/* Họ tên */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700">First name</label>
                  <input
                    type="text"
                    placeholder="Enter your profile name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700">Last name</label>
                  <input
                    type="text"
                    placeholder="Enter your profile name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              </div>

              {/* Giới tính */}
              <div>
                <label className="block mb-1 text-gray-700">
                  What's your gender?{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <div className="flex gap-8 mt-1">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500"
                    />
                    Female
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-green-500"
                    />
                    Non-binary
                  </label>
                </div>
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block mb-1 text-gray-700">What's your date of borth?</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="sr-only">Month</label>
                    <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                      <option>Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="sr-only">Date</label>
                    <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                      <option>Date</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="sr-only">Year</label>
                    <select className="w-full h-[50px] border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                      <option>Year</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-16"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {FaEyeSlash({className:"w-5 h-5"})}
                    <span className="ml-1 text-sm">Hide</span>
                  </button>
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
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
                <label className="text-black text-sm">
                  Share my registration data with our content providers for
                  marketing purposes.
                </label>
              </div>

              {/* Nút đăng ký */}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white text-lg font-semibold mt-2 hover:opacity-90 transition"
              >
                Sign up
              </button>

              {/* Đã có tài khoản */}
              <div className="text-center text-gray-500 text-sm mt-2">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-black underline hover:text-green-500"
                >
                  Log in
                </a>
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
