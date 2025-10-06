import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useAddLink = () => {
    const { username, domain, platforms, job } = useLocation().state || {};
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [additionalLinks, setAdditionalLinks] = useState<string[]>(['', '']);

    // Initialize value map for selected platforms
    const initialMap = useMemo(() => {
        if (!Array.isArray(platforms)) return {} as Record<string, string>;
        return platforms.reduce((acc: Record<string, string>, name: string) => {
            acc[name] = '';
            return acc;
        }, {} as Record<string, string>);
    }, [platforms]);

    const [platformLink, setPlatformLink] = useState<Record<string, string>>(initialMap);

    const updatePlatformValue = (platform: string, value: string) => {
        setPlatformLink(prev => ({ ...prev, [platform]: value }));
    };  
    const clearPlatformValue = (platform: string) => {
        setPlatformLink(prev => ({ ...prev, [platform]: '' }));
    };

    // Additional links (3 slots)
    const updateAdditionalLink = (index: number, value: string) => {
        setAdditionalLinks(prev => prev.map((v, i) => (i === index ? value : v)));
    };

    const handleContinue = () => {
        {/*còn logic check link có thật hay không*/}
        {/*post link o day*/}
        
        navigate('/signup/create-name-bio', { 
            state: { 
                username: username, 
                domain: domain,
                job: job
            } 
        });
    };

    const handleSkip = () => {
        navigate('/signup/create-name-bio', { 
            state: { 
                username: username, 
                domain: domain, 
                job: job
            } 
        });
    };

    const handleBack = () => {
        navigate('/signup/select-platform', { 
            state: { 
                username: username, 
                domain: domain,
                job: job,
            } 
        });
    };

    return {
        username,
        domain,
        platforms,
        showError,
        setShowError,
        navigate,
        platformLink,
        updatePlatformValue,
        clearPlatformValue,
        additionalLinks,
        updateAdditionalLink,
        handleContinue,
        handleSkip,
        handleBack,
    }
}
export default useAddLink;