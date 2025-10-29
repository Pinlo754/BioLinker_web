"use client";

import type React from "react";

import useSetPassword from "./useSetPassword";
import { FaEyeSlash } from "react-icons/fa";
import useSignUp from "../useSignUp";

type SetPasswordProps = {
  visible: boolean;
  emailGg: string;
};

const SetPassword: React.FC<SetPasswordProps> = ({ visible, emailGg }) => {
  const { validatePassword } = useSignUp();
  const {
    password,
    showPassword,
    setPassword,
    setShowPassword,
    confirmPassword,
    setConfirmPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getStarted,
    handleCancel,
  } = useSetPassword();

  if (!visible) return null;

  const isMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    validatePassword(password);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col items-center gap-4 sm:gap-5 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 text-center">
          Tạo Mật Khẩu Mới
        </h1>

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base font-medium text-gray-700">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-14 sm:pr-16"
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

          <div className="mt-1 text-xs sm:text-sm text-red-500 min-h-[20px]">
            {!validatePassword(password) && password.length > 0 ? (
              <>
                Mật khẩu phải có ít nhất 8 ký tự, sự kết hợp của chữ cái, số và
                ký tự đặc biệt
                <span className="ml-2">(*)</span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base font-medium text-gray-700">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="w-full border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-14 sm:pr-16"
            />
            <button
              type="button"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
            >
              {FaEyeSlash({ className: "w-4 h-4 sm:w-5 sm:h-5" })}
              <span className="ml-1 text-xs sm:text-sm">
                {showConfirmPassword ? "Ẩn" : "Hiện"}
              </span>
            </button>
          </div>
          <div className="text-xs sm:text-sm text-red-500 min-h-[20px]">
            {confirmPassword.length > 0 && !isMatch
              ? "Mật khẩu xác nhận không khớp"
              : ""}
          </div>
        </div>

        <button
          type="button"
          onClick={() => getStarted(emailGg)}
          disabled={!isMatch}
          className={`mt-2 w-full rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white ${
            isMatch
              ? "bg-gradient-to-r from-green1 to-green2 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Lưu mật khẩu
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="mt-2 w-full rounded-xl font-semibold text-sm sm:text-base text-red-500/80 px-3 sm:px-4 py-2 sm:py-3 border-red-500/80 hover:bg-red-500/40 border"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};

export default SetPassword;
