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

        {/*còn logic check domain có tồn tại trong db hay không*/}
        navigate('/signup/select-platform', { state: { username: username, domain: domain } } );
    };

    const handleBack = () => {
        navigate('/signup');
    };

    const handleSkip = () => {
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