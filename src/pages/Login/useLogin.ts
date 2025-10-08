import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

export interface GoogleLoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser?: string;
  prompt?: string;
  id_token?: string;
}

export interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const BASE_URL = "https://biolinker.onrender.com/api";
  const resetPassword = () => {
    navigate("verify-email-reset-password?email=" + email);
  };

  const postGoogleLogin = async (id_token : string) => {
    const response = await axios.post(`${BASE_URL}/Auth/login-google`, { idToken: id_token });
    if(response.data){
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("userId", response.data.userId);
      if(response.data.nickname === null){
        console.log(response.data.nickName);
        navigate("/create-account",{state: {emailGg: response.data.email, setPassword: true}});
      }
      else{
        navigate("/dashboard");
      }
    }
    else{
      toast.error("Đăng nhập Google thất bại!");
    }
  };
  // // Login bằng Google
  // const loginByGoogle = useGoogleLogin({
  //   flow: "auth-code",
  //   scope: "openid email profile",
  //   onSuccess: async (response: any) => {
  //     console.log("Google login response:", response);
  //     try {
  //       const res = await postGoogleLogin(response);
  //       if (res.status === 200) {
  //         toast.success("Đăng nhập Google thành công!");
  //         const user = res.data;
  //         localStorage.setItem("token", user.token);
  //         localStorage.setItem("userId", user.userId);
  //         localStorage.setItem("role", user.role);

  //         if (user.role === "Admin") {
  //           navigate("/admin");
  //         } else if (user.role === "Staff") {
  //           navigate("/staff");
  //         } else if (user.role === "User") {
  //           navigate("/");
  //         } else {
  //           navigate("/");
  //         }
  //       } else {
  //         toast.error("Đăng nhập Google thất bại 11111 !");
  //       }
  //     } catch (error: any) {
  //       toast.error(
  //         error?.response?.data?.message ||
  //           "Đăng nhập Google thất bại 222222222!"
  //       );
  //     }
  //   },
  //   onError: () => {
  //     toast.error("Đăng nhập Google thất bại 33333333!");
  //   },
  // });
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isLoginFbParams = params.get("isLoginFb") === "true";

    if (isLoginFbParams) {
      handleFacebookResponse();
    }
  }, []);

  // Hàm gọi backend facebook-response
  const handleFacebookResponse = async () => {
      // Bước 2: nhận lại token và thông tin user từ URL
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const email = params.get("email");
      const userId = params.get("userId");
      const name = params.get("name");
      const role = params.get("role") || "FreeUser";

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId || "");
        localStorage.setItem("email", email || "");
        localStorage.setItem("name", name || "");
        localStorage.setItem("role", role);
        toast.success("Đăng nhập bằng Facebook thành công!");
        if (role === "Admin") navigate("/admin");
        else if (role === "staff") navigate("/staff");
        else navigate("/");
        toast.success("Đăng nhập bằng Facebook thành công!");
    }
  };

  // Khi click login -> chuyển hướng đến backend (để bắt đầu quy trình OAuth)
  const loginByFacebook = () => {
    window.location.href = "https://biolinker.onrender.com/api/Auth/login-facebook";
  };

  // Login bằng Email/Password
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(
        "https://biolinker.onrender.com/api/Auth/Login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      if (data?.token) {
        localStorage.setItem("password", password); {/** dung tam out come 1 */}
        localStorage.setItem("email", email); {/** dung tam out come 1 */}
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Login successful!");
        if (data.role?.[0] === "Admin") navigate("/admin");
        else if (data.role?.[0] === "staff") navigate("/staff");
        else navigate("/dashboard");
      } else {
        toast.error("Login failed: invalid response from server.");
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  // Hàm chọn login theo method
  const LoginBy = (method: string) => {
    switch (method) {
      case "Facebook":
        loginByFacebook();
        break;
      // case "Google":
      //   loginByGoogle();
        break;
      case "Apple":
      case "LinkedIn":
      case "SSO":
        toast.info(`Login with ${method} is coming soon!`);
        break;
    }
  };

  return {
    navigate,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    LoginBy,
    resetPassword,
    passwordInputRef,
    errorMessage,
    setErrorMessage,
    toast,
    postGoogleLogin,
  };
};

export default useLogin;
