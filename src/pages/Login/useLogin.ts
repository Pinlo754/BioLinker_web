import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { m } from "motion/dist/react";
const useLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  //   const toggleShowPassword = () => {
  //     setShowPassword(!showPassword);
  //   };

  const passwordInputRef = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     if (passwordInputRef.current) {
  //       passwordInputRef.current.focus();
  //     }
  //   }, [showPassword]);

  const resetPassword = () => {
    navigate("verify-email-reset-password?email=" + email);
  };

  //   const handleLoginClick = async () => {
  //     if (!email || !password) {
  //       setErrorMessage("Please enter both email and password.");
  //       return;
  //     }

  //     await handleLogin();

  //     if (passwordInputRef.current) {
  //       passwordInputRef.current.focus();
  //     }
  //   };

  const handleLogin = async () => {
    // setDisableSubmitButton(true);

    // try {
    //   const response = await axios.post("/api/account/login", {
    //     email: email,
    //     password: password,
    //   });
    //   const data = response.data;

    //   if (!data?.token) {
    //     throw new Error("Failed to login");
    //   }

    //   localStorage.setItem("token", data.token);
    //   localStorage.setItem("userId", data.userId);
    //   localStorage.setItem("role", response.data.role[0]);
    //   console.log("role:" + response.data.role[0]);

    //   if(response.data.role[0] === "User") navigate("/main");
    //   else if (response.data.role[0] === "Admin") navigate("/Admin");
    //   else navigate("/staff/main");
    // } catch (error) {
    //   setErrorMessage("Something went wrong");
    // }
    // finally {
    //   setDisableSubmitButton(false);
    // }

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    } else if (email != "test@gmail.com" || password != "test1234") {
      toast.error("Invalid email or password.");
      return;
    } else {
      toast.success("Login successful!");
      localStorage.setItem("token", "test_token");
      localStorage.setItem("userId", "test_user_id");
      localStorage.setItem("role", "User");
      navigate("/");
    }
  };

  const LoginBy = (method: string) => {
    switch (method) {
      case "Google": {
        toast.info("Login with Google is coming soon!");
        break;
      }
      case "Facebook": {
        toast.info("Login with Facebook is coming soon!");
        break;
      }
      case "Apple": {
        toast.info("Login with Apple is coming soon!");
        break;
      }
      case "LinkedIn": {
        toast.info("Login with LinkedIn is coming soon!");
        break;
      }
      case "SSO": {
        toast.info("Login with SSO is coming soon!");
        break;
      }
    }
  };
  return {
    navigate,
    email,
    setEmail,
    password,
    setPassword,
    // disableSubmitButton,
    // toggleShowPassword,
    // showPassword,
    // handleLoginClick,
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
