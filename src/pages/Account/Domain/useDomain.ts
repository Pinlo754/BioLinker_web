import { fetcher, fetcherWithParams } from "../../../api/fetchers";
import axios from "axios";
import { useState } from "react";
const useDomain = () => {
    const [domain, setDomain] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const checkDomain = async () => {
        const response = await fetcher("Auth/domains");
        if(response){
            const listDomain = response.domain
            console.log("listDomain",listDomain);
            if(listDomain.includes(domain)){
                return true;
            }
            else{
                return false;
            }
        }
        return false;
    }

    const handleContinue = async () => {
        setLoading(true);
        const check = await checkDomain();
        console.log("check",check);
        if(check){
            setLoading(false);
            setMessage("Domain đã tồn tại, Vui lòng nhập domain khác");
            return;
        }
        try{            
            const userData = localStorage.getItem("user");

            if(userData){
                const userId = localStorage.getItem("userId");
                const user = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
                console.log("user",user);
                const data = {
                    userId: user?.userId,
                    job: user?.job,
                    nickname: user?.nickName,
                    description: user?.description,
                    customDomain: domain,
                    userImage: user?.userImage,
                }
                console.log("data",data);
                const response = await axios.patch("https://biolinker.onrender.com/api/Auth/profile-customize", data);
                if(response){
                    localStorage.removeItem("user");
                    const userId = localStorage.getItem("userId");
                    const user = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
                    if(user){
                        const userData = JSON.stringify(user);
                        localStorage.setItem("user", userData);
                        setMessage("Tên miền đã được thay đổi thành công");
                        setSuccess("success");
                    }  
                }
            }
        } catch (error) {
            setShowError(true);
        } finally{
            setLoading(false);
        }
    }
    const newDomain = (domain: string) => {
        const user = localStorage.getItem('user');
        if(user){
            const userData = JSON.parse(user);
            userData.customDomain = domain;
            localStorage.setItem('user', JSON.stringify(userData));
            const plan = userData.currentPlanId;
            if(plan === "PRO-PLAN"){
                setType('new')
            }
            else{
                setMessage('Nâng cấp lên gói business để sử dụng tính năng thay đổi tên miền');
                setSuccess("error");
            }
        }
    }

    const changeDomain = (domain: string) => {
        setMessage('Tính năng này sẽ sớm được cập nhật');
        setSuccess("error");
    }
    return{
        domain,
        setDomain,
        showError,
        errorMessage,
        handleContinue,
        setShowError,
        type,
        setType,
        changeDomain,
        message,
        setMessage,
        newDomain,
        loading,
        success
    }
}
export default useDomain;