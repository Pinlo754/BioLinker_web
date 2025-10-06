import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../../api/fetchers";

const useCreateName = () => {
    const { username, domain, additionalLinks, platformLink } = useLocation().state || {};
    const [displayName, setDisplayName] = useState<string>(username || "");
    const [bio, setBio] = useState<string>("");
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const data = {
        displayName: displayName,
        bio: bio,
        avatarUrl: avatarUrl,
        username: username,
        domain: domain,
        additionalLinks: additionalLinks,
        platformLink: platformLink,
    }
    const handleContinue = async () => {
        try {
            const response = true;
            // await postData("/user/create-name-bio", data);
            console.log(data);
            if(response){
                // navigate('/');
            }
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    const handleBack = () => {
        navigate('/signup/add-link', { 
            state: { 
                username: username, 
                domain: domain, 
            } 
        });
    }

    return {
        username,
        domain,
        additionalLinks,
        platformLink,
        navigate,
        handleContinue,
        handleBack,
        displayName,
        setDisplayName,
        bio,
        setBio,
        avatarUrl,
        setAvatarUrl,
        fileInputRef,
        error,
    }
}
export default useCreateName;