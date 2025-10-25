import { deleteDataWithParams, fetcherWithParams } from "../../../../api/fetchers"
import { useState } from "react"

const useCollection = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'smallGrid'>('smallGrid')
    const [templates, setTemplates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const removeFavorite = async (userId: string, templateId: string) => {
        try {
            const arrayTemplateId = [templateId];
            const response = await deleteDataWithParams(`Collection/${userId}`, arrayTemplateId, {userId: userId});
            return response;
        } catch (error) {
            console.error('Error removing favorite:', error);
            return false;
        }
    };

    const changeFavoriteStatus = async (isFavorite: boolean, templateId: string) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return false;
            
            // Chỉ xử lý remove (xóa khỏi collection)
            if (isFavorite) {
                const response = await removeFavorite(userId, templateId);
                
                if (response) {
                    // Sau khi remove thành công, reload lại danh sách template
                    await getFavouriteId();
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error changing favorite status:', error);
            return false;
        }
    }

    const getFavouriteId = async () => {
        setIsLoading(true);
        const userId = localStorage.getItem("userId");
        const response = await fetcherWithParams(`Collection/${userId}`, {userId: userId});
        if (response) {
            const templateIds = response.templates;
            const templateCollection = await Promise.all(
                templateIds.map(async (item: any) => await fetcherWithParams(`Template/${item}`, {id: item}))
            );
            const allTemplate = templateCollection.map((item: any) => ({...item, isFavorite: true}));
            console.log(allTemplate);
            setTemplates(allTemplate);
            setCount(templateIds.length);
        }
        setIsLoading(false);
    }
    return {
        viewMode,
        setViewMode,
        templates,
        changeFavoriteStatus,
        getFavouriteId,
        isLoading,
        count,
    }
}

export default useCollection