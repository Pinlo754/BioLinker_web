import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../api/fetchers";
import { toast } from "react-toastify";
const useSetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const getStarted = async (emailGg: string) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if(user){
            const userName = user.fullName;
            const response = await postData("Auth/reset-password", {email: emailGg, newPassword: password});
            if(response){
                navigate("/get-started", { state: { username: userName, email: emailGg, password: password } });
            }
            else{
                toast.error("Đặt mật khẩu thất bại!");
            }
        }
    }
    const handleCancel = () => {
        localStorage.removeItem("user");
        navigate("/");
    }
    return {
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
    }
}

export default useSetPassword;