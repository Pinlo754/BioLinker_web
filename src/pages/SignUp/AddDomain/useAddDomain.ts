import { fetcher } from "../../../api/fetchers";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddDomain = () => {
    const { username, job, email, password } = useLocation().state;
    const [domain, setDomain] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const checkDomain = async () => {
        const response = await fetcher("Auth/domains");
        if(response){
            const listDomain = response.domain
            console.log("listDomain",listDomain);
            if(listDomain.includes(domain)){
                return true;
            }
            else{
                return false;
            }
        }
        return false;
    }
    const handleContinue = async () => {
        setIsLoading(true);
        if (domain.trim() === '') {
            setIsLoading(false);
            setShowError(true);
            setErrorMessage("Vui lòng nhập domain");
            return;
        } else{
            const check = await checkDomain();
            console.log("check",check);
            if(check){
                setIsLoading(false);
                setShowError(true);
                setErrorMessage("Domain đã tồn tại, Vui lòng nhập domain khác");
                return;
            }
        }
        setIsLoading(false);
        navigate('/signup/select-platform', { state: { username: username, domain: domain, job: job, email: email, password: password } } );
    };

    const handleBack = () => {
        navigate('/get-started', { state: { email: email, password: password } });
    };

    const handleSkip = () => {
        navigate('/signup/select-platform', { state: { username: username, domain: '', job: job, email: email, password: password } } );
    };
    return {
        username,
        domain,
        showError,
        navigate,
        handleContinue,
        handleBack,
        handleSkip,
        setDomain,
        setShowError,
        errorMessage,
        isLoading
    }
};

export default AddDomain;