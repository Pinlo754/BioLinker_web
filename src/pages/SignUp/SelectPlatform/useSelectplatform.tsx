import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSelectPlatform = () => {
    const { username, domain, job, email, password } = useLocation().state;
    const navigate = useNavigate();
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const maxSelectedPlatforms = 4
    const platforms = [
        'Instagram',
        'TikTok',
        'YouTube',
        'Telegram',
        'Spotify',
        'Threads',
        'Facebook',
        'X',
        'Github',
        'Linkedin',
        'Discord',
        'SoundCloud',
    ];

    const togglePlatform = (platformName: string) => {
        setSelectedPlatforms(prev => {
            if (prev.includes(platformName)) {
                return prev.filter(p => p !== platformName);
            } else if (prev.length < maxSelectedPlatforms) {
                return [...prev, platformName];
            }
            return prev;
        });
    };

    const handleContinue = () => {
        navigate('/signup/add-link', { 
            state: { 
                username: username, 
                domain: domain, 
                platforms: selectedPlatforms,
                job: job,
                email: email,
                password: password
            } 
        });
    };

    const handleSkip = () => {
        navigate('/signup/add-link', { 
            state: { 
                username: username, 
                domain: domain, 
                platforms: [],
                job: job,
                email: email,
                password: password
            } 
        });
    };
    const handleBack = () => {
        navigate('/signup/add-domain', { 
            state: { 
                username: username, 
                domain: domain,
                job: job,
                email: email,
                password: password
            } 
        });
    };

    return {
        username,
        domain,
        platforms,
        selectedPlatforms,
        togglePlatform,
        handleContinue,
        handleSkip,
        maxSelectedPlatforms,
        handleBack
    }
};

export default useSelectPlatform;