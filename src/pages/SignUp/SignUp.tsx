import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import { FaEyeSlash } from "react-icons/fa";
import logo_big from "../../assets/logo_big.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(true);

  // State input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Gom data
    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      const res = await axios.post(
        "https://biolinker.onrender.com/api/Auth/Register",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", res.data);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col scrollbar-hide">
      <Header />
      <div className="flex items-center bg-gradient-to-r from-green1 to-green2 mt-10 py-10 ">
        <div className="flex flex-col md:flex-row items-center py-12 px-4 w-full max-w-7xl justify-around mx-auto  ">
          {/* Logo */}
          <div className="flex-[3] flex justify-center items-center w-full mb-8 md:mb-0 hidden md:block">
            <img src={logo_big} className="h-[333px]" alt="logo" />
          </div>

          {/* Form */}
          <div className="flex-1 w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:ml-20">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Họ tên */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700">First name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-gray-700">Last name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-16"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {FaEyeSlash({ className: "w-5 h-5" })}
                    <span className="ml-1 text-sm">{showPassword ? "Hide" : "Show"}</span>
                  </button>
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Use 8 or more characters with a mix of letters, numbers & symbols
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
                  Share my registration data with our content providers for marketing purposes.
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
                <a href="/login" className="text-black underline hover:text-green-500">
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
