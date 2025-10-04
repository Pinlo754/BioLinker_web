import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDomain = () => {
    const [username, setUsername] = useState('Khoa');
    const [domain, setDomain] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        if (domain.trim() === '') {
            setShowError(true);
            return;
        }
        // Handle continue logic here
        navigate('/signup/add-bio', { state: { username: username, domain: domain } } );
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    const handleSkip = () => {
        // Handle skip logic here
        navigate('/signup/add-bio', { state: { username: username, domain: '' } } );
    };
    return {
        username,
        domain,
        showError,
        navigate,
        handleContinue,
        handleBack,
        handleSkip,
        setUsername,
        setDomain,
        setShowError
    }
};

export default AddDomain;