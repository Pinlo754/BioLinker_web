import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDomain = () => {
    const [name, setName] = useState('Khoa');
    const [domain, setDomain] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        if (domain.trim() === '') {
            setShowError(true);
            return;
        }
        // Handle continue logic here
        navigate('/signup/select-platform', { state: { username: name, domain: domain } } );
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    const handleSkip = () => {
        // Handle skip logic here
        navigate('/signup/select-platform', { state: { username: name, domain: '' } } );
    };
    return {
        name,
        domain,
        showError,
        navigate,
        handleContinue,
        handleBack,
        handleSkip,
        setName,
        setDomain,
        setShowError
    }
};

export default AddDomain;