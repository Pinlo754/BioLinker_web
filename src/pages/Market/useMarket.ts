import { useState } from "react";
import { fetcher, fetcherWithParams } from "../../api/fetchers";
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
    templateId: string;
    isFavorite: boolean;
}

const useMarket = () => {

    const [freeTemplate, setFreeTemplate] = useState<Template[]>([]);
    const [allTemplates, setAllTemplates] = useState<Template[]>([]);
    const [displayedTemplates, setDisplayedTemplates] = useState<Template[]>([]);
    const [premiumTemplate, setPremiumTemplate] = useState<Template[]>([]);
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const getAllTemplates = async () =>{
        setLoading(true);
        try {
            const response = await fetcher ("Template")
            if(response){
                const templates = response.filter((template: Template) => template.status === "Active")
                const favoriteTemplates = await getFavoriteTemplates(templates);
                const favoriteIds = favoriteTemplates?.map(fav => fav.templateId) || [];
                const templatesWithFavorite = templates.map((template:Template) => ({
                    ...template,
                    isFavorite: favoriteIds.includes(template.templateId)
                }));        
                setAllTemplates(templatesWithFavorite);
                setDisplayedTemplates(templatesWithFavorite);
                
                // Extract unique categories
                const uniqueCategories = Array.from(new Set(templatesWithFavorite.map((template: Template) => template.category))).filter(Boolean) as string[];
                setCategoryOptions(uniqueCategories);
            } else{
                setMessage("no template")
            }
        } catch (error) {
          setError(true);  
        } finally {
            setLoading(false);
        }
    }

    // Get templates by type
    const getTemplatesByType = async (type: string) => {
        setLoading(true);
        if(type === "free") {
            getFreeTemplates();
        } else if(type === "premium") {
            getPremiumTemplates();
        } else if(type === "all") {
            getAllTemplates();
        } else if(type === "favorite") {
            const favoriteTemplates = await getFavoriteTemplates(allTemplates);
            if(favoriteTemplates) {
                const likedTemplates = favoriteTemplates.map((template: Template) => ({
                    ...template,
                    isFavorite: true
                }));
                setDisplayedTemplates(likedTemplates);
            } else {
                setDisplayedTemplates([]);
            }
        }
        setLoading(false);
    }

    // Get free templates
    const getFreeTemplates =() => {
        if(freeTemplate.length > 0) {
            setDisplayedTemplates(freeTemplate);
        } else {
        const freeTemplates = allTemplates.filter((template: Template) => template.isPremium === false);
        setFreeTemplate(freeTemplates);
        setDisplayedTemplates(freeTemplates);
        }
    }

    // Get premium templates
    const getPremiumTemplates =() => {
        if(premiumTemplate.length > 0) {
            setDisplayedTemplates(premiumTemplate);
        } else {
            const premiumTemplates = allTemplates.filter((template: Template) => template.isPremium === true);
            setPremiumTemplate(premiumTemplates);
            setDisplayedTemplates(premiumTemplates);
        }
    }

    const getFavoriteTemplates = async (allTemplates: Template[]) => {
        try {
            const userId = localStorage.getItem("userId")
            const response = await fetcherWithParams (`Collection/${userId}`,{userId: userId});
            if(response){
                const templates = response.templates;
                const likeTemplates = allTemplates.filter((template: Template) => templates.find((t: string) => t === template.templateId));
                return likeTemplates;
            }
        } catch (error) {
            setError(true);
        }
    }

    // Search function
    const searchTemplates = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when searching
        
        if (term.trim() === "") {
            setDisplayedTemplates(allTemplates);
        } else {
            const filteredTemplates = allTemplates.filter(template => 
                template.name && template.name.toLowerCase().includes(term.toLowerCase())
            );
            setDisplayedTemplates(filteredTemplates);
        }
    };

    // Filter function
    const filterTemplates = (jobFilter?: string, categoryFilter?: string) => {
        setCurrentPage(1); // Reset to first page when filtering
        
        let filteredTemplates = allTemplates;
        
        // Apply job filter
        if (jobFilter && jobFilter.trim() !== "") {
            filteredTemplates = filteredTemplates.filter(template => 
                template.job && template.job.toLowerCase().includes(jobFilter.toLowerCase())
            );
        }
        
        // Apply category filter
        if (categoryFilter && categoryFilter.trim() !== "") {
            filteredTemplates = filteredTemplates.filter(template => 
                template.category && template.category.toLowerCase().includes(categoryFilter.toLowerCase())
            );
        }
        
        setDisplayedTemplates(filteredTemplates);
    };

    // Pagination calculations
    const totalPages = Math.ceil(displayedTemplates.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTemplates = displayedTemplates.slice(startIndex, endIndex);

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
        currentTemplates,
        currentPage,
        totalPages,
        goToPage,
        goToNextPage,
        goToPrevPage,
        getFreeTemplates,
        getPremiumTemplates,
        getTemplatesByType,
        searchTemplates,
        searchTerm,
        categoryOptions,
        filterTemplates,
        loading,
    }
}
export default useMarket;