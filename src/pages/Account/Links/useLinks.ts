import { useState } from "react";
import avatar from "../../../assets/avatar.png";
import { fetcherWithParams, postData, putDataWithParams, } from "../../../api/fetchers";
import platformDetect from "../../../constants/platformDetect";
import { toast } from "react-toastify";
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
    const [image, setImage] = useState("");
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
        const response = await fetcherWithParams(`Auth/${userId}`,{userId: userId})
        if(response){
            setDisplayName(response.nickName);
            setBio(response.description);
            setDomain(response.customerDomain);
            setImage(response.userImage );
        }
    }
    const getAllLinks = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetcherWithParams(`StaticLinks/user/${userId}`,{userId: userId})
            if(response){
                setLinks(response.reverse());
                console.log(response);
            }else{
                setError(true);
            }
        }catch (error) {
            setError(true);
            console.log(error);
        }
    }

    const changeLinkTitle = async (linkId: string, title: string) => {
        setLinks(links.map((link) => link.staticLinkId === linkId ? { ...link, title } : link));
        try{
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const link = links.find((link) => link.staticLinkId === linkId);
            if(link){
                const data = {
                    title: title,
                    platform: link.platform,
                    icon: link.icon,
                    defaultUrl: link.defaultUrl,
                    status: link.status
                }
                const response = await putDataWithParams(`StaticLinks/${linkId}`,data,{id:linkId ,userId: userId})
                if(response){
                    toast.success("Cập nhật thành công");
                }else{
                    toast.error("Cập nhật thất bại");
                }
            }else{
                setError(true);
                console.log("Link ko ton tai");
            }
        }catch (error) {
            setError(true);
            console.log("Error changing link title", error);
        }finally{
            setLoading(false);
        }
    }

    const changeLinkUrl = async (linkId: string, url: string) => {
        setLinks(links.map((link) => link.staticLinkId === linkId ? { ...link, defaultUrl: url } : link));
        setLoading(true);
        try{
            const userId = localStorage.getItem("userId");
            const { detectPlatformFromUrl, isHttpUrl } = platformDetect(url);
            var currentPlatform = detectPlatformFromUrl;
            if(isHttpUrl){
                if(currentPlatform === "unknown"){
                    currentPlatform = "Link";
                }
            }
            const link = links.find((link) => link.staticLinkId === linkId);
            if(link){
                const data = {
                    title: link.title,
                    platform: currentPlatform,
                    icon: link.icon,
                    defaultUrl: url,
                    status: isHttpUrl ? "public" : "hidden"
                }
                const response = await putDataWithParams(`StaticLinks/${linkId}`,data,{id:linkId ,userId: userId})
                if(response){
                    toast.success("Cập nhật thành công");
                }else{
                    toast.error("Cập nhật thất bại");
                }
            }else{
                setError(true);
                console.log("Link ko ton tai");
            }
        }catch (error) {
            setError(true);
            console.log("Error changing link url", error);
        }finally{
            setLoading(false);
        }
    }

    const changeLinkStatus = (linkId: string, status: string) => {
        setLinks(links.map((link) => link.staticLinkId === linkId ? { ...link, status } : link));
    }


    const handleAddLink = async (platform: string) => {
        setAddLinkModal(false);
        setLoading(true);
        try {
            const data = {
                userId: localStorage.getItem("userId"),
                title: platform,
                platform: platform,
                defaultUrl: "",
                status:"hidden"
            }
            const response = await postData("StaticLinks",data)
            if(response){
                getAllLinks();
            }
        } catch (error) {
            setError(true);
            console.log(error);
        }finally{
            setLoading(false);
        }
    
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
        image,
    };
};

export default useLinks;