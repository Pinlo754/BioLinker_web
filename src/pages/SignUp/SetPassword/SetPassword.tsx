import useSetPassword from "./useSetPassword";
import { FaEyeSlash } from "react-icons/fa";
import useSignUp from "../useSignUp";
type SetPasswordProps = {
    visible: boolean;
    emailGg: string;
}
const SetPassword: React.FC<SetPasswordProps>= ({ visible, emailGg}) => {
    const { validatePassword } = useSignUp();
    const { password, showPassword, setPassword, setShowPassword, confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword, getStarted, handleCancel } = useSetPassword();
    if (!visible) return null
    const isMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword && validatePassword(password);
    return (
        <div className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-[1px] flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center gap-4 w-[40%] h-[50%]">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Tạo Mật Khẩu mới</h1>
              <div className="w-full max-w-md flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className={`w-full border rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-16`}
                  />
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
                {!validatePassword(password) && password.length > 0 && (
                    <div className="  mt-1 text-xs text-red-500">
                    Mật khẩu phải có ít nhất 8 ký tự, sự kết hợp của chữ cái, số và ký tự đặc biệt
                    <span className="ml-2 text-red-500">(*)</span>
                    </div>
                )}
              </div>

              <div className="w-full max-w-md flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className={`w-full border rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-16`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {FaEyeSlash({ className: "w-5 h-5" })}
                    <span className="ml-1 text-sm">{showConfirmPassword ? "Ẩn" : "Hiện"}</span>
                  </button>
                {confirmPassword.length > 0 && !isMatch && (
                  <p className="text-xs text-red-500">Mật khẩu xác nhận không khớp</p>
                )}                
                </div>
              </div>

              <button
                type="button"
                onClick={() => getStarted(emailGg)}
                disabled={!isMatch}
                className={`mt-2 w-full max-w-md rounded-xl px-4 py-3 text-white ${isMatch ? "bg-gradient-to-r from-green1 to-green2 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"}`}
              >
                Lưu mật khẩu
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={`mt-2 w-full max-w-md rounded-xl font-semibold text-red-500/80 px-4 py-3  border-red-500/80 hover:bg-red-500/40 border `}
              >
                Hủy bỏ
              </button>
            </div>
      </div>
    )
}

export default SetPassword;