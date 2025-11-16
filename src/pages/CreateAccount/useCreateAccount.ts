import { fetcher } from "../../api/fetchers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useCreateAccount = () => {  
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(false);
    const [validSubmit, setValidSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [exitsEmail, setExitsEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const checkValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleCreateAccount = async (email: string) => {
        setLoading(true);
        setValidSubmit(true);
        if (checkValidEmail(email)) {
            setValidEmail(true);
            const response = await fetcher('Auth/emails');
            if(response.success) {
                const emails = response.emails;
                if(emails.includes(email)) {
                    setExitsEmail(true);
                    setLoading(false);
                    return;
                }
            }
            navigate("/signup", { state: { email: email } });
        } else {
            setValidEmail(false);
        }
        setLoading(false);
    }
      
    return { 
        validEmail, 
        validSubmit, 
        email,
        setEmail,
        setValidEmail, 
        setValidSubmit,
        handleCreateAccount,
        exitsEmail,
        loading,
    };
}
export default useCreateAccount;