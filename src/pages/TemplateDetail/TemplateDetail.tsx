import React, { useEffect, useState } from "react";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import MarketCard from "./MarketCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetcher, fetcherWithParams, postData, deleteDataWithParams } from "../../api/fetchers";
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/outline"
import {LoadingOverlay} from "../../components/ui/loading";
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
const TemplateDetail = () => {
  const { templateId } = useParams();
  const [templateDetail, setTemplateDetail] = useState<any>(null);  
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestedTemplates, setSuggestedTemplates] = useState<Template[]>([]);
  const [message, setMessage] = useState("");
  const free = "FREE-PLAN";
  const pro = "PRO-PLAN";
  const business = "BUSINESS-PLAN";
  useEffect(() => {
    getTemplateDetail();
    getFiveTemplate();
  }, [templateId]);

  const getTemplateDetail = async () => {
    setIsLoading(true);
    const response = await fetcherWithParams(`Template/${templateId}`, {id: templateId});
    if (response) {
      setTemplateDetail(response);
      const collection = await getCollection();
      console.log(collection);
      if (collection) {
        setIsFavorite(true);
      }
    }
    setIsLoading(false);
  }

  const getCollection = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetcherWithParams(`Collection/${userId}`, {userId: userId});
    if (response) {
      const templates = response.templates;
      const checkTemplate = templates.includes(templateId);
      console.log(checkTemplate);
      return checkTemplate;
    }
  }

  const getFiveTemplate = async () => {
    try {
      const response = await fetcher("Template");
      if (response) {
        const templates = response.filter((template: Template) => template.status === "Active");
        
        // Lấy favorite templates để check isFavorite
        const userId = localStorage.getItem("userId");
        const favoriteResponse = await fetcherWithParams(`Collection/${userId}`, {userId: userId});
        const favoriteIds = favoriteResponse?.templates || [];
        
        // Thêm isFavorite vào từng template và lấy 5 template ngẫu nhiên
        const templatesWithFavorite = templates
          .map((template: Template) => ({
            ...template,
            isFavorite: favoriteIds.includes(template.templateId)
          }))
          .sort(() => Math.random() - 0.5) // Shuffle array
          .slice(0, 5);
        
        setSuggestedTemplates(templatesWithFavorite);
      }
    } catch (error) {
      console.error("Error getting suggested templates:", error);
    }
  };

  const canUseCollection = () => {
    const user = localStorage.getItem("user");
    if (!user) return false;
    
    const userData = JSON.parse(user);
    const currentPlanId = userData.currentPlanId;
    
    if (currentPlanId === free) {
      return false; // Free plan không được dùng collection
    } else if (currentPlanId === pro) {
      return !templateDetail?.isPremium; // PRO plan chỉ được dùng với template miễn phí
    } else if (currentPlanId === business) {
      return true; // Business plan được dùng với tất cả template
    }
    
    return false;
  };

  const handleFavoriteClick = async () => {
    if (!templateId) return;
    
    const user = localStorage.getItem("user");
    if (!user) return;
    
    const userData = JSON.parse(user);
    const currentPlanId = userData.currentPlanId;
    
    if (currentPlanId === free) {
      setMessage("Free plan không được sử dụng tính năng collection");
      return;
    } else if (currentPlanId === pro) {
      // PRO plan chỉ được dùng với template miễn phí
      if (templateDetail && !templateDetail.isPremium) {
        setIsLoading(true);
        try {
          const userId = userData.userId;
          
          if (isFavorite) {
            await removeFavorite(userId, templateId);
          } else {
            await addFavorite(userId, templateId);
          }
        } catch (error) {
          console.error("Error handling favorite:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setMessage("PRO plan chỉ được sử dụng với template miễn phí");
      }
    } else if (currentPlanId === business) {
      // Business plan được dùng với tất cả template
      setIsLoading(true);
      try {
        const userId = userData.userId;
        
        if (isFavorite) {
          await removeFavorite(userId, templateId);
        } else {
          await addFavorite(userId, templateId);
        }
      } catch (error) {
        console.error("Error handling favorite:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addFavorite = async (userId: string, templateId: string) => {
    const data = {
      userId: userId,
      templateIds: [templateId],
    };
    const response = await postData("Collection", data);
    if (response) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = async (userId: string, templateId: string) => {
    const arrayTemplateId = [templateId];
    const response = await deleteDataWithParams(`Collection/${userId}`, arrayTemplateId, {userId: userId});
    if (response) {
      setIsFavorite(false);
    }
  };


  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      {<LoadingOverlay visible={isLoading} />}
      <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12 mt-10">
        {/* main content */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full max-w-screen-2xl px-4">
          {/* Ảnh lớn bên trái */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              <img
                src={templateDetail?.previewImage || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"}
                alt="Template"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Card thông tin */}
          <div className="flex-1 flex items-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-lg relative">
              {/* Nút 3 chấm */}
              {/* <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg width="24" height="24" fill="none">
                  <circle cx="5" cy="12" r="2" fill="#bbb" />
                  <circle cx="12" cy="12" r="2" fill="#bbb" />
                  <circle cx="19" cy="12" r="2" fill="#bbb" />
                </svg>
              </button> */}
              <button 
                className={`absolute top-4 right-8 backdrop-blur-sm p-2 rounded-full transition-colors ${
                  canUseCollection() 
                    ? "bg-white/90 hover:bg-white cursor-pointer" 
                    : " cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (canUseCollection()) {
                    handleFavoriteClick();
                  }
                }}
                disabled={!canUseCollection()}
                >
                {isFavorite ? (
                  <HeartSolidIcon className={`w-8 h-8 ${canUseCollection() ? "text-red-500" : "text-gray-400"}`} />
                ) : (
                  <HeartIcon className={`w-8 h-8 ${canUseCollection() ? "text-gray-600" : "text-gray-400"}`} />
                )}
              </button>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 ">
                {templateDetail?.name}
              </h2>

              {/* <div className="flex items-center mb-2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="avatar"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2"
                />
                <span className="text-gray-500 text-xs sm:text-sm">Creator</span>
                <span className="ml-2 font-semibold text-black text-xs sm:text-sm">
                  {actorName}
                </span>
              </div> */}

              <p className="text-gray-500 mb-6 text-sm sm:text-base">{templateDetail?.description}</p>

              <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 mb-6">
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">12</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Lượt xem</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">5</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Lượt thích</div>
                </div>
              </div>

              <button className="w-full py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white text-base sm:text-lg font-semibold hover:opacity-90 transition"
              onClick={() => navigate(`/bio-edit?templateId=${templateId}`)}>
                Chọn template
              </button>
            </div>
          </div>
        </div>

        {/* main attribute */}
        <div className="flex flex-col gap-4 w-full max-w-screen-2xl px-10 mt-10 sm:mt-12">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span className="text-sm sm:text-base md:text-lg border rounded-2xl px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white border-transparent">
              {templateDetail?.isPremium ? "Trả phí" : "Miễn phí"}
            </span>
            {templateDetail?.category && (<span className="text-sm sm:text-base md:text-lg border rounded-2xl px-3 sm:px-4 py-1 sm:py-2 border-gray-400 text-gray-600 bg-white">
              {templateDetail?.category}
            </span>)}
            {templateDetail?.job && (<span className="text-sm sm:text-base md:text-lg border rounded-2xl px-3 sm:px-4 py-1 sm:py-2 border-gray-400 text-gray-600 bg-white">
              {templateDetail?.job}
            </span>)}
          </div>
          <div className="flex-1 w-full md:w-2/3">
            <p className="text-gray-700 text-sm sm:text-base">{templateDetail?.description}</p>
          </div>
        </div>

        {/* last created 5 template */}
        <div className="flex flex-col gap-4 w-full max-w-screen-2xl px-4 mt-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-start">
            Đề xuất template
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-screen-2xl gap-4 sm:gap-6 px-6 mt-6 sm:mt-10">
          {suggestedTemplates.map((template, i) => (
            <MarketCard 
              key={i} 
              templateId={template.templateId}
              image={template.previewImage} 
              isFavorite={template.isFavorite} 
              name={template.name} 
              isPremium={template.isPremium} 
              job={template.job} 
              category={template.category}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplateDetail;
