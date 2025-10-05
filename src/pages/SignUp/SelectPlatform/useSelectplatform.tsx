import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSelectPlatform = () => {
    const { username, domain } = useLocation().state || {};
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
        navigate('/signup/create-name-bio', { 
            state: { 
                username: username, 
                domain: domain, 
                platforms: selectedPlatforms 
            } 
        });
    };

    const handleSkip = () => {
        navigate('/signup/create-name-bio', { 
            state: { 
                username: username, 
                domain: domain, 
                platforms: [] 
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
        maxSelectedPlatforms
    }
};

export default useSelectPlatform;