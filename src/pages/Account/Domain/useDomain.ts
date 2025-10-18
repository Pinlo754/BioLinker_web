import { useState } from "react";

const useDomain = () => {
    const [domain, setDomain] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState('');
    const handleContinue = () => {
        if(domain.trim() === ''){
            setShowError(true);
            setErrorMessage('Vui lòng nhập tên miền');
        }
        else{
            setShowError(false);
            setErrorMessage('');
        }
    }
    return{
        domain,
        setDomain,
        showError,
        errorMessage,
        handleContinue,
        setShowError,
        type,
        setType,
    }
}
export default useDomain;