import { useState } from "react";
import { fetcherWithParams } from "../../api/fetchers";

const useCollection = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const getUserData = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const user = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
            setUser(user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return{
        user,
        getUserData,
        loading,
    }
}
export default useCollection