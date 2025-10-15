import { useState } from "react";
import avatar from "../../../assets/avatar.png";

const useLinks = () => {
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("John Doe");
    const [bio, setBio] = useState("I am a software engineer");
    const [domain, setDomain] = useState("john-doe.bio");
    return {
        loading,
        avatar,
        displayName,
        bio,
        domain,
    };
};

export default useLinks;