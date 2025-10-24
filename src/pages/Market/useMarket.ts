import { useState } from "react";
import { fetcher } from "../../api/fetchers";
import template1 from '../../assets/template1.jpeg'
import template2 from '../../assets/template2.jpg'
import template3 from '../../assets/template3.jpg'
import template4 from '../../assets/template4.jpg'
type Template = {
    previewImage: string;
    name: string;
    isPremium: boolean;
    job: string;
    category: string;
    status: string;
}

const useMarket = () => {
    const cards = [
        { image: template1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
        { image: template2, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
        { image: template3, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
        { image: template4, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
        { image: template1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
        { image: template2, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
        { image: template3, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
        { image: template4, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
      ]

    const [freeTemplate, setFreeTemplate] = useState();
    const [allTemplates, setAllTemplates] = useState<Template[]>([]);
    const [premiumTemplate, setPremiumTemplate] = useState();
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("");
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const getAllTemplates = async () =>{
        try {
            const response = await fetcher ("Template")
            if(response){
                const templates = response.filter((template: Template) => template.status === "Active")
                setAllTemplates(templates);
            } else{
                setMessage("no template")
            }
        } catch (error) {
          setError(true);  
        }
    }

    // Pagination calculations
    const totalPages = Math.ceil(allTemplates.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTemplates = allTemplates.slice(startIndex, endIndex);

    // Pagination handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return{
        getAllTemplates,
        allTemplates,
        currentTemplates,
        currentPage,
        totalPages,
        goToPage,
        goToNextPage,
        goToPrevPage,
    }
}
export default useMarket;