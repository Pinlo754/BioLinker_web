import { useNavigate } from "react-router-dom"
import { HeartIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"

export default function MarketCard({
  image,
  name,
  isPremium,
  views = 1250,
  downloads = 89,
  job = "Lập trinh viên",
  category = ["Lập trình", "Thiết kế"],
  isLiked = false,
}: {
  image: string
  name: string
  isPremium?: boolean
  views?: number
  downloads?: number
  job?: string
  category?: string[]
  isLiked?: boolean
}) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-3xl max-w-[290px] min-w-[240px] shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
      onClick={() => {
        navigate(`/template-detail/`);
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
        
        {/* Premium badge */}
        {isPremium && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
               
            </span>
          </div>
        )}
        
        {/* Price badge */}
        <div className="absolute top-4 right-4">
          {isPremium ? (
          <span className="px-2 py-2 rounded-full text-sm font-bold shadow-lg bg-green-500 text-white" >
            ⭐ Premium
          </span>
          ): (
            <span className="px-3 py-1 rounded-full text-sm font-bold shadow-lg bg-white text-gray-800" >
              Free
            </span>
          )}
        </div>
        
        {/* Action buttons overlay */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle like
            }}
          >
            {isLiked ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
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
              {job}
            </span>
            {category.map((category) => (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
