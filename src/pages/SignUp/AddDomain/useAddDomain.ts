import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddDomain = () => {
    const { username } = useLocation().state || {username: 'khoa'};
    const [domain, setDomain] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        if (domain.trim() === '') {
            setShowError(true);
            return;
        }
        // Handle continue logic here
        navigate('/signup/select-platform', { state: { username: username, domain: domain } } );
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    const handleSkip = () => {
        // Handle skip logic here
        navigate('/signup/select-platform', { state: { username: username, domain: '' } } );
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
        setShowError
    }
};

export default AddDomain;