import Footer from "../../components/sections/Footer";
import Header from "../../components/sections/Header";
import { FaLock } from "react-icons/fa";
import useLogin from "./useLogin";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const {
    // handleLoginClick,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    LoginBy,
    // showPassword,
    // toggleShowPassword,
    // disableSubmitButton,
    errorMessage,
  } = useLogin();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <ToastContainer/>
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#16C875] to-[#6CDFAB] w-full h-[719px]">
        <div className="w-[564px] h-[658px] bg-white rounded-[24px] px-[42px] py-[42px] flex flex-col items-center justify-center">
          <div className="font-helvetica font-medium text-[40px] flex justify-center items-center w-full">
            Log in
          </div>
          <div className="flex">
            <div className="font-helvetica">New to Design Space? </div>
            <a
              href="/signup"
              className="font-helvetica ml-1 underline text-[#16C875]"
            >
              Sign up for free
            </a>
          </div>
          <div>
            <div className="font-helvetica text-gray-500 mt-8">
              Email address
            </div>
            <div className="w-[480px] h-[56px] rounded-[12px] border border-gray-300 flex items-center justify-between px-[30px] mt-2">
              <input
                type="text"
                placeholder="Enter your email"
                className="font-helvetica text-[14px] outline-none bg-transparent flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="font-helvetica text-gray-500 mt-8">Password</div>
            <div className="w-[480px] h-[56px] rounded-[12px] border border-gray-300 flex items-center justify-between px-[30px] mt-2">
              <input
                type="text"
                placeholder="Enter your password"
                className="font-helvetica text-[14px] outline-none bg-transparent flex-1" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-start mt-1 w-full">
            <div className="font-helvetica cursor-pointer">
              Forget Password?
            </div>
          </div>
          <div className="w-[480px] h-[56px] rounded-[32px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex items-center justify-center mt-4 text-white text-center"
            onClick={handleLogin}>
            Log in
          </div>

          <div className="flex justify-between items-center w-full mt-8">
            <div className="w-[110px] h-[56px] rounded-[40px] border border-black flex items-center justify-center"
              onClick={() => LoginBy("Facebook")}>            
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook Logo"
                className="w-6 h-6"
              />
            </div>
            <div className="w-[110px] h-[56px] rounded-[40px] border border-black flex items-center justify-center" 
              onClick={() => LoginBy("Apple")}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Logo"
                className="w-6 h-6"
              />
            </div>
            <div className="w-[110px] h-[56px] rounded-[40px] border border-black flex items-center justify-center"            
              onClick={() => LoginBy("Google")}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
                alt="Google Logo"
                className="w-6 h-6"
              />
            </div>
            <div className="w-[110px] h-[56px] rounded-[40px] border border-black flex items-center justify-center"
              onClick={() => LoginBy("LinkedIn")}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/LinkedIn_Logo_2013_%282%29.svg"
                alt="LinkedIn Logo"
                className="w-14 h-14"
              />
            </div>
          </div>
        <div className="w-[480px] h-[56px] rounded-[32px] bg-white flex items-center justify-center mt-4 text-black text-center border border-black"
          onClick={() => LoginBy("SSO")}>           
             {FaLock({ className: "mr-4"})} Log in with SSO
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
