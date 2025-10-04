import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';

const useLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const resetPassword = () => {
    navigate("verify-email-reset-password?email=" + email);
  };

  const loginByGoogle = useGoogleLogin({
  onSuccess: async (response) => {
      try {
        // response chứa .credential là idToken
        const idToken = (response as any).credential;
        console.log("Google idToken:", idToken);
        // const res = await axios.post(
        //   'https://biolinker.onrender.com/api/Auth/login-google',
        //   { idToken },
        //   { headers: { 'Content-Type': 'application/json' } }
        // );

        // toast.success('Login successful!');
        // console.log(res.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Login failed');
      }
    },
    onError: () => {
      toast.error('Google login failed');
    },
});


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

      // Nếu API trả về token hoặc thông tin người dùng
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId || "");
        localStorage.setItem("role", data.role?.[0] || "User");

        toast.success("Login successful!");

        // Điều hướng theo role (tuỳ API trả về role)
        if (data.role?.[0] === "Admin") navigate("/admin");
        else if (data.role?.[0] === "staff") navigate("/staff");
        else navigate("/");
      } else {
        toast.error("Login failed: invalid response from server.");
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
      setErrorMessage(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const LoginBy = (method: string) => {
    switch (method) {      
      case "Facebook":
      case "Apple":
      case "LinkedIn":
      case "SSO":
        toast.info(`Login with ${method} is coming soon!`);
        break;
      case "Google":
        loginByGoogle();
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
  };
};

export default useLogin;
