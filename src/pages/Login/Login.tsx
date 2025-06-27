import Header from "../../components/sections/Header";

const Login = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
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
              />
            </div>
          </div>
          <div className="flex justify-start mt-1 w-full">
            <div className="font-helvetica cursor-pointer">
              Forget Password?
            </div>
          </div>
          <div className="w-[480px] h-[56px] rounded-[32px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] flex items-center justify-center mt-4 text-white text-center">
            Log in
          </div>

          <div className="flex justify-between items-center w-full mt-8">
            <div className="w-[110px] h-[56px] rounded-[40px] border border-gray-300 flex items-center justify-center">Facebook</div>
            <div className="w-[110px] h-[56px] rounded-[40px] border border-gray-300 flex items-center justify-center">Apple</div>
            <div className="w-[110px] h-[56px] rounded-[40px] border border-gray-300 flex items-center justify-center">Google</div>
            <div className="w-[110px] h-[56px] rounded-[40px] border border-gray-300 flex items-center justify-center">LinkedIn</div>
          </div>

        <div className="w-[480px] h-[56px] rounded-[32px] bg-white flex items-center justify-center mt-4 text-black text-center border border-gray-300">
            
            Log in with SSO
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
