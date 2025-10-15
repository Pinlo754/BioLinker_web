import { useState } from "react";
import avatar from "../../../assets/avatar.png";
import { fetcherWithParams } from "../../../api/fetchers";
type Link = {
    staticLinkId:string;
    userId: string;
    title: string;
    icon: string;
    platform: string;
    defaultUrl: string;
    status: string;
}
const useLinks = () => {
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("John Doe");
    const [bio, setBio] = useState("I am a software engineer");
    const [domain, setDomain] = useState("john-doe.bio");
    const [title, setTitle] = useState("Tiêu đề");
    const [url, setUrl] = useState("URL");
    const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
    const [editingUrlId, setEditingUrlId] = useState<string | null>(null);
    const [addLinkModal, setAddLinkModal] = useState(false);
    const toggleEditTitle = (linkId: string | null, currentTitle?: string) => {
        setEditingTitleId(prev => (prev === linkId ? null : linkId));
        if (linkId && typeof currentTitle === 'string') setTitle(currentTitle);
    };
    const toggleEditUrl = (linkId: string | null, currentUrl?: string) => {
        setEditingUrlId(prev => (prev === linkId ? null : linkId));
        if (linkId && typeof currentUrl === 'string') setUrl(currentUrl);
    };
    const [links, setLinks] = useState<Link[]>([]);
    const [error, setError] = useState(false);
    const getUserInfo = async () => {
        const userId = localStorage.getItem("userId");
        const response = await fetcherWithParams(`Users/user/${userId}`,{userId})
        if(response){
            setDisplayName(response.displayName);
            setBio(response.bio);
            setDomain(response.customDomain);
        }
    }
    const getAllLinks = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const response = await fetcherWithParams(`StaticLinks/user/${userId}`,{userId})
            if(response){
                setLinks(response);
                console.log(response);
            }else{
                setError(true);
            }
        }catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const changeLinkTitle = (linkId: string, title: string) => {
        setLinks(links.map((link) => link.staticLinkId === linkId ? { ...link, title } : link));
    }
    const changeLinkUrl = (linkId: string, url: string) => {
        setLinks(links.map((link) => link.staticLinkId === linkId ? { ...link, defaultUrl: url } : link));
    }
    const changeLinkStatus = (linkId: string, status: string) => {
        setLinks(links.map((link) => link.staticLinkId === linkId ? { ...link, status } : link));
    }


    const handleAddLink = async (platform: string) => {
        setAddLinkModal(false);
    
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
        editingTitleId,
        editingUrlId,
        toggleEditTitle,
        toggleEditUrl,
        addLinkModal,
        setAddLinkModal,
        handleAddLink,
        error,
        getUserInfo,
        getAllLinks,
        links,
        changeLinkTitle,
        changeLinkUrl,
        changeLinkStatus,
        setLoading,
    };
};

export default useLinks;