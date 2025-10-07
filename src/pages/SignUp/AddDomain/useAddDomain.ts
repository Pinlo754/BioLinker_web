import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddDomain = () => {
    const { username, job, email, password } = useLocation().state;
    const [domain, setDomain] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        if (domain.trim() === '') {
            setShowError(true);
            return;
        }
        console.log("domain",job);
        {/*còn logic check domain có tồn tại trong db hay không*/}
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
        setShowError
    }
};

export default AddDomain;