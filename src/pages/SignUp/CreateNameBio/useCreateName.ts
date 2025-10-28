import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import upload from "../../../lib/upload";
import { fetcherWithParams, postData } from "../../../api/fetchers";

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
    const [backgroundUrl, setBackgroundUrl] = useState<string>("https://firebasestorage.googleapis.com/v0/b/chat-app-5396e.appspot.com/o/images%2F1761644495471template4.jpg?alt=media&token=f80560f3-e4a1-4a72-99f2-6f64d9184f8d");
    const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
    const backgroundFileInputRef = useRef<HTMLInputElement>(null);
    const handleContinue = async () => {
        try {
            setLoading(true);
            let fileUrl = "";
            let backgroundFileUrl = "https://firebasestorage.googleapis.com/v0/b/chat-app-5396e.appspot.com/o/images%2F1761644495471template4.jpg?alt=media&token=f80560f3-e4a1-4a72-99f2-6f64d9184f8d";
            if(avatarFile && backgroundFile){
                fileUrl = await upload(avatarFile);
                backgroundFileUrl = await upload(backgroundFile);
            }
            const userId = localStorage.getItem("userId");
                const data = {
                    userId: userId,
                    job: job,
                    nickname: displayName,
                    description: description,
                    customDomain: domain,
                    userImage: fileUrl,
                    isBeginner: true,
                    backgroundImage: backgroundFileUrl,
                }
                const response = await axios.patch("https://biolinker.onrender.com/api/Auth/profile-customize", data);
                if(response){
                    const user = await fetcherWithParams(`Auth/${userId}`, {userId: userId});
                    if(user){
                        const userString = JSON.stringify(user);
                        localStorage.setItem("user", userString);
                        setLoading(false);
                        navigate('/dashboard');
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
        backgroundUrl,
        setBackgroundUrl,
        backgroundFileInputRef,
        backgroundFile,
        setBackgroundFile,
    }
}
export default useCreateName;