import { useState } from "react";
import avatar from "../../../assets/avatar.png";

const useLinks = () => {
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("John Doe");
    const [bio, setBio] = useState("I am a software engineer");
    const [domain, setDomain] = useState("john-doe.bio");
    const [title, setTitle] = useState("Tiêu đề");
    const [url, setUrl] = useState("URL");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingUrl, setIsEditingUrl] = useState(false);
    const [addLinkModal, setAddLinkModal] = useState(false);
    const toggleEditTitle = () => setIsEditingTitle((prev) => !prev);
    const toggleEditUrl = () => setIsEditingUrl((prev) => !prev);

    const handleAddLink = (platform: string) => {
        setAddLinkModal(false);
        console.log(platform);
    }
    return {
        loading,
        avatar,
        displayName,
        bio,
        domain,
        title,
        setTitle,
        url,
        setUrl,
        isEditingTitle,
        isEditingUrl,
        toggleEditTitle,
        toggleEditUrl,
        addLinkModal,
        setAddLinkModal,
        handleAddLink,
    };
};

export default useLinks;