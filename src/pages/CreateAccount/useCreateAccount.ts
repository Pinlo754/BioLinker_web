import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useCreateAccount = () => {  
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(false);
    const [validSubmit, setValidSubmit] = useState(false);
    const [email, setEmail] = useState("");

    const checkValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleCreateAccount = (email: string) => {
        setValidSubmit(true);
        if (checkValidEmail(email)) {
            setValidEmail(true);
            navigate("/signup", { state: { email: email } });
        } else {
            setValidEmail(false);
        }
    }
    return { 
        validEmail, 
        validSubmit, 
        email,
        setEmail,
        setValidEmail, 
        setValidSubmit,
        handleCreateAccount
    };
}
export default useCreateAccount;