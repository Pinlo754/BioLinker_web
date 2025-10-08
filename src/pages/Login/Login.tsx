import Footer from "../../components/sections/Footer";
import Header from "../../components/sections/Header";
import { FaLock } from "react-icons/fa";
import useLogin from "./useLogin";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    LoginBy,
    errorMessage,
    postGoogleLogin
  } = useLogin();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <ToastContainer />
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#16C875] to-[#6CDFAB] w-full min-h-[80vh] px-4 mt-10 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center shadow-lg">
          {/* Title */}
          <div className="font-helvetica font-medium text-2xl sm:text-3xl md:text-4xl text-center w-full mb-4">
            Log in
          </div>
          <div className="flex">
            <div className="font-helvetica">New to Design Space? </div>
            <a
              href="/create-account"
              className="font-helvetica ml-1 underline text-[#16C875]"
            >
              Sign up for free
            </a>
          </div>

          {/* Email input */}
          <div className="w-full mb-4">
            <label className="font-helvetica text-gray-500 text-sm sm:text-base">
              Email address
            </label>
            <div className="w-full h-14 rounded-lg border border-gray-300 flex items-center px-4 mt-2">
              <input
                type="text"
                placeholder="Enter your email"
                className="font-helvetica text-sm sm:text-base outline-none bg-transparent flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password input */}
          <div className="w-full mb-1">
            <label className="font-helvetica text-gray-500 text-sm sm:text-base">
              Password
            </label>
            <div className="w-full h-14 rounded-lg border border-gray-300 flex items-center px-4 mt-2">
              <input
                type="password"
                placeholder="Enter your password"
                className="font-helvetica text-sm sm:text-base outline-none bg-transparent flex-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Forget password */}
          <div className="w-full flex justify-start mt-2 text-sm sm:text-base">
            <span className="font-helvetica cursor-pointer text-gray-600">
              Forget Password?
            </span>
          </div>

          {/* Login button */}
          <div
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex items-center justify-center mt-4 text-white text-center cursor-pointer"
            onClick={handleLogin}
          >
            Log in
          </div>

          {/* Social login */}
          <div className="flex flex-col items-center w-full mt-6 gap-3">
            {/* Google Login UI */}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const idToken = credentialResponse.credential;
                if (idToken) {
                  // console.log("Google ID Token:", idToken);
                  toast.success("Google login success!");
                  postGoogleLogin(idToken);
                } else {
                  toast.error("No ID token received");
                }
              }}
              onError={() => {
                toast.error("Google login failed!");
              }}
              theme="outline"
              size="large"
              shape="rectangular"
              text="signin_with"
            />

            {/* Các nút social khác */}
            <div className="flex justify-between items-center w-full gap-1 md:gap-3">
              {[
                {
                  name: "Facebook",
                  src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
                },
                {
                  name: "Apple",
                  src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                },
                {
                  name: "LinkedIn",
                  src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/LinkedIn_Logo_2013_%282%29.svg",
                  large: true,
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="w-[48%] sm:w-[30%] h-14 rounded-2xl border flex items-center justify-center cursor-pointer"
                  onClick={() => LoginBy(item.name)}
                >
                  <img
                    src={item.src}
                    alt={`${item.name} Logo`}
                    className={`${item.large ? "w-10 h-10" : "w-6 h-6"}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SSO login */}
          <div
            className="w-full h-14 rounded-2xl bg-white flex items-center justify-center mt-4 text-black text-center border border-black cursor-pointer"
            onClick={() => LoginBy("SSO")}
          >
            {FaLock({ className: "mr-4" })} Log in with SSO
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
