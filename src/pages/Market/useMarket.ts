import { useState } from "react";
import { fetcher } from "../../api/fetchers";

const useMarket = () => {
    const [freeTemplate, setFreeTemplate] = useState();
    const [premiumTemplate, setPremiumTemplate] = useState();
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("");
    const getAllTemplates = async () =>{
        try {
            const response = await fetcher ("Template")
            if(response){
                
            } else{
                setMessage("no template")
            }
        } catch (error) {
          setError(true);  
        }
    }
    return{

    }
}
export default useMarket;