import { useNavigate } from "react-router-dom"
import { HeartIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function MarketCard({
  image,
  name,
  isPremium,
  templateId,
  job ,
  category ,
  isFavorite = false,
  onFavoriteChange,
  onFavoriteClick,
}: {
  image: string
  name: string
  isPremium?: boolean
  templateId?: string
  job?: string
  category?: string
  isFavorite?: boolean
  onFavoriteChange?: (templateId: string, newFavoriteStatus: boolean) => void
  onFavoriteClick?: (templateId: string, isFavorite: boolean) => void
}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const free = "FREE-PLAN";
  const pro = "PRO-PLAN";
  const business = "BUSINESS-PLAN";
  // Check if user can use collection feature
  const canUseCollection = () => {
    const user = localStorage.getItem("user");
    if (!user) return false;
    
    const userData = JSON.parse(user);
    const currentPlanId = userData.currentPlanId;
    
    if (currentPlanId === free) {
      return false; // Free plan không được dùng collection
    } else if (currentPlanId === pro) {
      return !isPremium; // PRO plan chỉ được dùng với template miễn phí
    } else if (currentPlanId === business) {
      return true; // Business plan được dùng với tất cả template
    }
    
    return false;
  };
  
  const changeFavoriteStatus = (isFavorite: boolean, templateId: string) => {
    if (canUseCollection() && onFavoriteClick) {
      onFavoriteClick(templateId, isFavorite);
    } else {
      // Show message for restricted plans
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        const currentPlanId = userData.currentPlanId;
        
        if (currentPlanId === free) {
          setMessage("Cần nâng cấp gói để sử dụng tính năng collection");
        } else if (currentPlanId === pro && isPremium) {
          setMessage("PRO plan chỉ được sử dụng với template miễn phí");
        }
      }
    }
  };


  return (
    <div className="bg-white rounded-3xl max-w-[290px] min-w-[240px] shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
      onClick={() => {
        navigate(`/template-detail/${templateId}`);
      }}
    >
      {/* Header với image và overlay */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-52  object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        
        {/* Price badge */}
        <div className="absolute top-4 right-4">
          {isPremium ? (
          <span className="px-2 py-2 rounded-full text-sm font-bold shadow-lg bg-green-500 text-white" >
            ⭐ Nâng cao
          </span>
          ): (
            <span className="px-3 py-1 rounded-full text-sm font-bold shadow-lg bg-white text-gray-800" >
              Miễn phí
            </span>
          )}
        </div>
        
        {/* Action buttons overlay */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className={`backdrop-blur-sm p-2 rounded-full transition-colors ${
              canUseCollection() 
                ? "bg-white/90 hover:bg-white" 
                : "bg-gray-300/90 "
            }`}
            onClick={(e) => {
              e.stopPropagation();
              changeFavoriteStatus(isFavorite, templateId || "");
            }}
            // disabled={!canUseCollection()}
          >
            {isFavorite ? (
              <HeartSolidIcon className={`w-5 h-5 ${canUseCollection() ? "text-red-500" : "text-gray-400"}`} />
            ) : (
              <HeartIcon className={`w-5 h-5 ${canUseCollection() ? "text-gray-600" : "text-gray-400"}`} />
            )}
          </button>
        </div>
        
        {/* Message display */}
        {/* {message && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {message}
          </div>
        )} */}
      </div>

      {/* Content */}
      <div className="px-6 py-2">
        {/* Title và Author */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {name}
          </h3>
        </div>

        {/* Category và Tags */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Danh mục</span>
            {/* <span className="text-xs text-gray-500">{downloads} downloads</span> */}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
              {job ? job : "Khác"}
            </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {category}
              </span>
          </div>
        </div>
      </div>
    </div>
  )
}
