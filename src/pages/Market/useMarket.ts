import { useState } from "react";
import { fetcher, fetcherWithParams, postData, deleteDataWithParams } from "../../api/fetchers";
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
    const free = "FREE-PLAN";
    const pro = "PRO-PLAN";
    const business = "BUSINESS-PLAN";
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

    // Handle favorite click
    const handleFavoriteClick = async (templateId: string, isFavorite: boolean) => {
        setLoading(true);
        try {
            const user = localStorage.getItem("user");
            if (user) {
                const userData = JSON.parse(user);
                const currentPlanId = userData.currentPlanId;
                
                // Tìm template để check isPremium
                const template = allTemplates.find(t => t.templateId === templateId);
                
                if (currentPlanId === free) {
                    // Free plan không được dùng collection
                    setMessage("Free plan không được sử dụng tính năng collection");
                    console.log("Free plan không được sử dụng tính năng collection");
                    return;
                } else if (currentPlanId === pro) {
                    // PRO plan chỉ được dùng với template miễn phí
                    if (template && !template.isPremium) {
                        if (isFavorite) {
                            await removeFavorite(userData.userId, templateId);
                        } else {
                            await addFavorite(userData.userId, templateId);
                        }
                    } else {
                        setMessage("PRO plan chỉ được sử dụng với template miễn phí");
                    }
                } else if (currentPlanId === business) {
                    // Business plan được dùng với tất cả template
                    if (isFavorite) {
                        await removeFavorite(userData.userId, templateId);
                    } else {
                        await addFavorite(userData.userId, templateId);
                    }
                }
            }
        } catch (error) {
            console.error("Error handling favorite:", error);
        } finally {
            setLoading(false);
        }
    };

    // Add favorite
    const addFavorite = async (userId: string, templateId: string) => {
        const data = {
            userId: userId,
            templateIds: [templateId],
        };
        const response = await postData("Collection", data);
        if (response) {
            toggleFavorite(templateId, true);
        }
    };

    // Remove favorite
    const removeFavorite = async (userId: string, templateId: string) => {
        const arrayTemplateId = [templateId];
        const response = await deleteDataWithParams(`Collection/${userId}`, arrayTemplateId, {userId: userId});
        if (response) {
            toggleFavorite(templateId, false);
        }
    };

    // Toggle favorite status
    const toggleFavorite = (templateId: string, newFavoriteStatus: boolean) => {
        // Cập nhật allTemplates
        setAllTemplates(prevTemplates => 
            prevTemplates.map(template => 
                template.templateId === templateId 
                    ? { ...template, isFavorite: newFavoriteStatus }
                    : template
            )
        );
        
        // Cập nhật displayedTemplates
        setDisplayedTemplates(prevTemplates => 
            prevTemplates.map(template => 
                template.templateId === templateId 
                    ? { ...template, isFavorite: newFavoriteStatus }
                    : template
            )
        );
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
        toggleFavorite,
        handleFavoriteClick,
        loading,
        message,
        setMessage,
    }
}
export default useMarket;