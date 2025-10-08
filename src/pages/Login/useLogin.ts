import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
      if(response.data.nickName === null){
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

  // Login bằng Google
  // const loginByGoogle = useGoogleLogin({
  //   flow: 'auth-code', // 👈 dùng Authorization Code flow
  //  scope: 'openid email profile',
  //   onSuccess: async (response: any) => {
  //     console.log("Google login response:", response);
  //     try {
  //       const res = await postGoogleLogin(response);
  //       if (res.status === 200) {
  //         toast.success("Đăng nhập Google thành công!");
  //         const user = res.data;
  //         console.log("Google login user:", user.role);
  //         localStorage.setItem("user", user.role);
  //         if (user.role === "Admin") {
  //           navigate("/admin");
  //         } else if (user.role === "Staff") {
  //           navigate("/staff");
  //         } else if (user.role === "User") {
  //           navigate("/get-started");
  //         } else {
  //           navigate("/");
  //         }
  //       } else {
  //         toast.error("Đăng nhập Google thất bại 11111 !");
  //       }
  //     } catch (error: any) {
  //       toast.error(
  //         error?.response?.data?.message || "Đăng nhập Google thất bại 222222222!"
  //       );
  //     }
  //   },
  //   onError: () => {
  //     toast.error("Đăng nhập Google thất bại 33333333!");
  //   },
  // });

  // Login bằng Facebook
  const loginByFacebook = async () => {
    try {
      const res = await axios.get(
        "https://biolinker.onrender.com/api/Auth/login-facebook",
        { headers: { Accept: "*/*" } }
      );
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId || "");
        localStorage.setItem("role", res.data.role?.[0] || "User");
        toast.success("Login with Facebook successful!");
        if (res.data.role?.[0] === "Admin") navigate("/admin");
        else if (res.data.role?.[0] === "staff") navigate("/staff");
        else navigate("/get-started");
      } else {
        toast.error("Facebook login failed: invalid response");
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Facebook login failed");
    }
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
    postGoogleLogin
  };
};

export default useLogin;
