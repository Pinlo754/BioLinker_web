import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useCreateAccount = () => {  
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(false);
    const [validSubmit, setValidSubmit] = useState(false);
    const handleCreateAccount = () => {
        setValidSubmit(true);
        navigate("/signup");
    }
    return { 
        validEmail, 
        validSubmit, 
        setValidEmail, 
        setValidSubmit,
        handleCreateAccount
    };
}
export default useCreateAccount;