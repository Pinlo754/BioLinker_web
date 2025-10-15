import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import upload from "../../../lib/upload";
import { postData } from "../../../api/fetchers";

const useCreateName = () => {
    const { username, domain, additionalLinks, platformLink, job, email, password } = useLocation().state || {};
    const [displayName, setDisplayName] = useState<string>(username || "");
    const [description, setDescription] = useState<string>("");
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleContinue = async () => {
        try {
            if(avatarFile){
                setLoading(true);
                const userId = localStorage.getItem("userId");
                console.log(userId);
                const fileUrl = await upload(avatarFile);
                console.log(fileUrl);
                const data = {
                    userId: userId,
                    job: job,
                    nickname: displayName,
                    description: description,
                    customerDomain: domain,
                    userImage: fileUrl,
                }
                const response = await axios.patch("https://biolinker.onrender.com/api/Auth/profile-customize", data);
                if(response){
                    console.log(email,password);
                    const login = await postData("Auth/Login", {email: email, password: password});
                    console.log(login);
                    if(login){
                        const user = JSON.stringify(login);
                        localStorage.setItem("user", user);
                        setLoading(false);
                        navigate('/dashboard');
                    }  
                }
            }
        } catch (error) {
            // setError(true);
            setLoading(false);
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
        avatarFile,
        setAvatarFile,
        setAvatarUrl,
        fileInputRef,
        description,
        setDescription,
        error,
        loading,
    }
}
export default useCreateName;