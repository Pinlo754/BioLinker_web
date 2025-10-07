import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../../api/fetchers";

const useAddLink = () => {
    const { username, domain, platforms, job } = useLocation().state || {};
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [additionalLinks, setAdditionalLinks] = useState<string[]>(['', '']);
    const [postSuccess, setPostSuccess] = useState(false);
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

    const handlePostSuccess = async () => {
        const userId = localStorage.getItem("userId");
        try {
            Object.entries(platformLink).forEach(async ([key, value]) => {
                const response = await postData("/StaticLinks", {
                    userId: userId,
                    title: key,
                    platform: key,
                    defaultUrl: value,
                    status: "public"
                });
                if(response) {
                    console.log("Link posted successfully 1");
                    setPostSuccess(true);
                } else {
                    console.log("Link posted failed 1");
                    setPostSuccess(false);
                }
            });
            

            if(additionalLinks.length > 0) {
                console.log("additionalLinks", additionalLinks);
                additionalLinks.forEach(async (value) => {
                    if(value !== "") { 
                        const response = await postData("/StaticLinks", {
                            userId: userId,
                            title: value,
                            platform: "additional",
                            defaultUrl: value,
                            status: "public"
                        });
                        if(response) {
                            console.log("Link posted successfully 2");
                            setPostSuccess(true);
                        } else {
                            console.log("Link posted failed 2");
                            setPostSuccess(false);
                        }
                    }
                });
            }
        } catch (error) {
            setShowError(true);
        }
    };

    const handleContinue = async () => {
        await handlePostSuccess();
        console.log(postSuccess);
        if(postSuccess) {
            navigate('/signup/create-name-bio', { 
            state: { 
                username: username, 
                    domain: domain, 
                    job: job
                } 
            });
        }
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