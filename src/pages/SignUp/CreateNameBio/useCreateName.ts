import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../../api/fetchers";
import axios from "axios";

const useCreateName = () => {
    const { username, domain, additionalLinks, platformLink, job } = useLocation().state || {};
    const [displayName, setDisplayName] = useState<string>(username || "");
    const [description, setDescription] = useState<string>("");
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const data = {
        displayName: displayName,
        avatarUrl: avatarUrl,
        domain: domain,
        job: job,
        description: description,
        additionalLinks: additionalLinks,
        platformLink: platformLink,
    }
    const handleContinue = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.patch("https://biolinker.onrender.com/api/Auth/profile-customize", {
                userId: userId,
                job: job,
                nickname: displayName,
                description: description,
                customDomain: domain,
            });
            if(response){
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleBack = () => {
        navigate('/signup/add-link', { 
            state: { 
                username: username, 
                domain: domain, 
                job: job,
                additionalLinks: additionalLinks,
                platformLink: platformLink,
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
        avatarUrl,
        setAvatarUrl,
        fileInputRef,
        error,
        description,
        setDescription,
    }
}
export default useCreateName;