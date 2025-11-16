import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import background from "../../assets/background.jpg";
import logo_big from "../../assets/logo_big.png";
import { Link, useLocation } from "react-router-dom";
import useCreateAccount from "./useCreateAccount";
import SetPassword from "../SignUp/SetPassword/SetPassword";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import useLogin from "../Login/useLogin";
import { LoadingOverlay } from "../../components/ui/loading";

const CreateAccount = () => {
  const { validEmail, validSubmit, handleCreateAccount, email, setEmail, exitsEmail, loading } =
    useCreateAccount();
  const { postGoogleLogin } = useLogin();
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const [buttonsWidth, setButtonsWidth] = useState<number>(0);
  const { emailGg, setPassword } = useLocation().state || {};

  useEffect(() => {
    if (!buttonsRef.current) return;
    const update = () => {
      if (!buttonsRef.current) return;
      setButtonsWidth(buttonsRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(buttonsRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <div className="relative flex flex-col md:flex-row items-center pt-10">
        {/* Background Image */}
        <img
          src={background}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative flex flex-col md:flex-row items-center py-12 w-full max-w-7xl justify-around mx-auto z-10 gap-6 md:gap-12">
          {/* Logo Section */}
          <div className="flex-[3] flex justify-center md:justify-start items-center w-full mb-6 md:mb-0">
            <img
              src={logo_big}
              className="w-[70%] sm:w-[60%] md:w-[63%] lg:w-[60%]"
              alt="logo"
            />
          </div>

          {/* Form Section */}
          <div className="flex-[1] w-full min-w-[0] sm:min-w-[350px] md:min-w-[500px] max-w-xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
            <form className="space-y-6">
              {/* Title */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                  Tạo tài khoản
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-gray-900 underline"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>

              {/* Social Buttons */}
              <div className="space-y-3 flex flex-col items-center justify-center w-full">
                <div className="w-full" ref={buttonsRef}>
                  {/* Facebook */}
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-800 hover:bg-gray-50 transition duration-200"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 36 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="17.8706"
                        cy="17.2041"
                        r="15.0605"
                        fill="#0C82EE"
                      />
                      <path
                        d="M23.4792 21.8098L24.1482 17.559H19.9631V14.8018C19.9631 13.6386 20.5466 12.504 22.4211 12.504H24.325V8.88512C24.325 8.88512 22.5979 8.5979 20.9475 8.5979C17.4992 8.5979 15.2475 10.6342 15.2475 14.3192V17.559H11.416V21.8098H15.2475V32.0864C16.0167 32.2042 16.8036 32.2644 17.6053 32.2644C18.4069 32.2644 19.1939 32.2042 19.9631 32.0864V21.8098H23.4792Z"
                        fill="white"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">
                      Tiếp tục với Facebook
                    </span>
                  </button>

                  {/* Google Login */}
                  <div className="flex flex-col items-center w-full mt-4">
                    <div className="google-login-responsive-wrapper w-full flex justify-center">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          const idToken = credentialResponse.credential;
                          if (idToken) {
                            toast.success("Google login success!");
                            postGoogleLogin(idToken);
                          } else {
                            toast.error("Không nhận được ID token từ Google!");
                          }
                        }}
                        onError={() => {
                          toast.error("Google login thất bại!");
                        }}
                        theme="outline"
                        size="large"
                        shape="circle"
                        text="continue_with"
                        logo_alignment="center"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="h-px w-full bg-gray-200" />
                <span className="absolute bg-white px-3 text-gray-500 text-sm sm:text-base">
                  HOẶC
                </span>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <p className="text-center text-base sm:text-lg text-gray-600">
                  Nhập địa chỉ email của bạn để tạo tài khoản.
                </p>
                <label className="block text-sm sm:text-base md:text-lg text-gray-700">
                  Email của bạn
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full mb-2 rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {validEmail === false && validSubmit ? (
                  <span className="ml-4 mt-4 text-red-500 text-sm sm:text-base">
                    Vui lòng nhập địa chỉ email hợp lệ
                  </span>
                ) : <></>}
                {exitsEmail ? (
                  <span className="ml-4 mt-4 text-red-500 text-sm sm:text-base">
                    Email đã tồn tại
                  </span>
                ) : <></>}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-6 py-3 sm:py-4 text-white text-lg sm:text-xl md:text-2xl font-semibold shadow-md hover:brightness-95 transition duration-200"
                onClick={() => handleCreateAccount(email)}
              >
                Tạo tài khoản
              </button>
            </form>
          </div>
        </div>

        {/* Set Password Modal */}
        {<SetPassword visible={setPassword} emailGg={emailGg} />}
      </div>

      <Footer />
      <LoadingOverlay visible={loading} message="Đang tải dữ liệu..." />
    </div>
  );
};

export default CreateAccount;
