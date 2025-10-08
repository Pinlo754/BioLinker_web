import { postData } from "../../../api/fetchers";
import axios from "axios";
import { useRef, useState } from "react";
import avatar from "../../../assets/avatar.png";
import upload  from "../../../lib/upload";
const useInformation = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [userImage, setUserImage] = useState("");
    const [plan, setPlan] = useState("Free");
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [job, setJob] = useState("");
    const [domain, setDomain] = useState("");
    const checkUserData = async () => {
        localStorage.removeItem("user");
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        const user = await postData("Auth/Login", {email: email, password: password});
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          try {
            const parsedUser = user;
            setName(parsedUser?.nickName);
            setEmail(parsedUser?.email);
            setDescription(parsedUser?.description);
            setUsername(parsedUser?.fullName);
            setPlan(parsedUser?.role);
            setJob(parsedUser?.job);
            setDomain(parsedUser?.customDomain);
            if(parsedUser?.userImage) {
                setUserImage(parsedUser?.userImage);
            } else {
                setUserImage(avatar);
            }
          } catch (error) {
            console.error("Error parsing user data:", error);
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
      };

      const handleSaveDetails = async () => {
        try {
                setLoading(true);
                const userId = localStorage.getItem("userId");
                const response = await axios.patch("https://biolinker.onrender.com/api/Auth/profile-customize", {
                    userId: userId,
                    nickname: name,
                    description: description,
                    job: job,
                    userImage: userImage,
                    customDomain: domain,            
                });
                if(response){
                    setLoading(false);
                }
        } catch (error) {
            setError(true);
            setLoading(false);
        }
      }

      const handleChangeImage = async (file: File) => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const fileUrl = await upload(file);
            const response = await axios.patch("https://biolinker.onrender.com/api/Auth/profile-customize", {
                userId: userId,
                userImage: fileUrl,
                nickname: name,
                description: description,
                job: job,
                customDomain: domain,
            });
            if(response){
                setUserImage(fileUrl);
                setLoading(false);
            }
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }

    return {
        userData,
        checkUserData,
        name,
        setName,
        email,
        setEmail,
        description,
        setDescription,
        plan,
        setPlan,
        username,
        setUsername,
        userImage,
        handleSaveDetails,
        loading,
        error,
        fileInputRef,
        handleChangeImage,
    }
}
export default useInformation;