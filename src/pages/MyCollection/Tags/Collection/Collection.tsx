import { useEffect, useState } from "react"
import useCollection from "./useCollection"
import { HeartIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import {LoadingOverlay} from "../../../../components/ui/loading"
import NotificationOverlay from "../../../../components/ui/noti"
import { useNavigate } from "react-router-dom"
interface CollectionProps {
    onCountChange?: (count: number) => void;
}

const Collection = ({ onCountChange }: CollectionProps) => {
    const { changeFavoriteStatus,  getFavouriteId, templates, isLoading, count } = useCollection()
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: 'success' as 'success' | 'error'
    });
    const navigate = useNavigate();
    useEffect(() => {
        getFavouriteId();
    }, []);

    useEffect(() => {
        if (onCountChange) {
            onCountChange(count);
        }
    }, [count, onCountChange]);

    const handleFavoriteToggle = async (template: any) => {
        const success = await changeFavoriteStatus(template.isFavorite, template.templateId || template.id);
        
        if (success) {
            setNotification({
                visible: true,
                message: template.isFavorite 
                    ? 'Đã xóa template khỏi bộ sưu tập' 
                    : 'Đã thêm template vào bộ sưu tập',
                type: 'success'
            });
        } else {
            setNotification({
                visible: true,
                message: 'Có lỗi xảy ra, vui lòng thử lại',
                type: 'error'
            });
        }
    };
    return (
        <div>
          
        {/* Controls row */}
        {/* <div className="max-w-screen-7xl w-full px-4 py-6 flex items-center justify-between gap-4"> */}
            {/* Left controls */}
            {/* <div className="flex items-center gap-4 min-w-0 w-2/3"> */}
            {/* Filters button */}
                {/* <button className="flex items-center gap-2 rounded-xl bg-[#F7F7FF] hover:bg-white/10 text-black px-4 py-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="font-medium">Filters</span>
                </button> */}
                            
                {/* Search */}
                {/* <div className="relative flex-1 min-w-[120px]  rounded-xl max-w-1/3 ">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </span>
                    <input  placeholder="Search by name"
                            className="w-1/2 bg-[#F7F7FF] border border-white/10 rounded-full py-3 pl-11 pr-4 placeholder-black text-black outline-none focus:border-white/20"
                    />
                </div>
            </div> */}
                  
            {/* Right controls */}
            {/* <div className="flex items-center gap-3"> */}
              {/* Sort dropdown */}
              {/* <button className="flex items-center gap-2 bg-[#F7F7FF] hover:bg-gray-200 text-black rounded-xl px-4 py-3">
                  <span className="whitespace-nowrap">Recently received</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </button> */}
              
              {/* View toggle */}
              {/* <div className="flex items-center gap-2">
                {/*Small Grid*/}
                {/* <button
                      onClick={() => setViewMode('smallGrid')}
                      className={`p-3 rounded-xl ${viewMode === 'smallGrid' ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white"  : 'bg-[#F7F7FF] hover:bg-green1 text-black'}`}
                      aria-label="Grid view"
                    >
                        <svg width="25" height="25" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66642 4.3335C5.19366 4.3335 3.99975 5.51105 3.99975 6.96363L3.99977 11.4534C3.99977 12.906 5.19367 14.0835 6.66643 14.0835H10.6664C12.1392 14.0835 13.3331 12.906 13.3331 11.4534L13.3331 6.96363C13.3331 5.51105 12.1392 4.3335 10.6664 4.3335L6.66642 4.3335Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M25.3331 18.5835C26.8059 18.5835 27.9998 19.7611 27.9998 21.2136V25.7034C27.9998 27.1559 26.8059 28.3335 25.3331 28.3335H21.3331C19.8603 28.3335 18.6664 27.1559 18.6664 25.7034L18.6664 21.2136C18.6664 19.7611 19.8603 18.5835 21.3331 18.5835H25.3331Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M25.3331 4.3335C26.8058 4.3335 27.9998 5.51105 27.9998 6.96363L27.9998 11.4534C27.9998 12.906 26.8059 14.0835 25.3331 14.0835H21.3331C19.8603 14.0835 18.6664 12.906 18.6664 11.4534L18.6664 6.96363C18.6664 5.51105 19.8603 4.3335 21.3331 4.3335L25.3331 4.3335Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.66643 18.5835C5.19367 18.5835 3.99977 19.7611 3.99977 21.2136L3.99977 25.7034C3.99977 27.1559 5.19368 28.3335 6.66644 28.3335H10.6664C12.1392 28.3335 13.3331 27.1559 13.3331 25.7034L13.3331 21.2136C13.3331 19.7611 12.1392 18.5835 10.6664 18.5835H6.66643Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button> */}
              
                {/*Grid*/}
                {/* <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl ${viewMode === 'grid'? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white" : 'bg-[#F7F7FF] hover:bg-green1 text-black'}`}
                      aria-label="Grid view"
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.866455 3.1332C0.866455 2.24955 1.5828 1.5332 2.46646 1.5332H5.66646C6.55011 1.5332 7.26646 2.24955 7.26646 3.1332V6.3332C7.26646 7.21686 6.55011 7.9332 5.66646 7.9332H2.46646C1.5828 7.9332 0.866455 7.21686 0.866455 6.3332V3.1332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M10.4665 3.1332C10.4665 2.24955 11.1828 1.5332 12.0665 1.5332H15.2665C16.1501 1.5332 16.8665 2.24955 16.8665 3.1332V6.3332C16.8665 7.21686 16.1501 7.9332 15.2665 7.9332H12.0665C11.1828 7.9332 10.4665 7.21686 10.4665 6.3332V3.1332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M20.0665 3.1332C20.0665 2.24955 20.7828 1.5332 21.6665 1.5332H24.8665C25.7501 1.5332 26.4665 2.24955 26.4665 3.1332V6.3332C26.4665 7.21686 25.7501 7.9332 24.8665 7.9332H21.6665C20.7828 7.9332 20.0665 7.21686 20.0665 6.3332V3.1332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M0.866455 12.7332C0.866455 11.8495 1.5828 11.1332 2.46646 11.1332H5.66646C6.55011 11.1332 7.26646 11.8495 7.26646 12.7332V15.9332C7.26646 16.8169 6.55011 17.5332 5.66646 17.5332H2.46646C1.5828 17.5332 0.866455 16.8169 0.866455 15.9332V12.7332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M10.4665 12.7332C10.4665 11.8495 11.1828 11.1332 12.0665 11.1332H15.2665C16.1501 11.1332 16.8665 11.8495 16.8665 12.7332V15.9332C16.8665 16.8169 16.1501 17.5332 15.2665 17.5332H12.0665C11.1828 17.5332 10.4665 16.8169 10.4665 15.9332V12.7332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M20.0665 12.7332C20.0665 11.8495 20.7828 11.1332 21.6665 11.1332H24.8665C25.7501 11.1332 26.4665 11.8495 26.4665 12.7332V15.9332C26.4665 16.8169 25.7501 17.5332 24.8665 17.5332H21.6665C20.7828 17.5332 20.0665 16.8169 20.0665 15.9332V12.7332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M0.866455 22.3332C0.866455 21.4496 1.5828 20.7332 2.46646 20.7332H5.66646C6.55011 20.7332 7.26646 21.4496 7.26646 22.3332V25.5332C7.26646 26.4169 6.55011 27.1332 5.66646 27.1332H2.46646C1.5828 27.1332 0.866455 26.4169 0.866455 25.5332V22.3332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M10.4665 22.3332C10.4665 21.4496 11.1828 20.7332 12.0665 20.7332H15.2665C16.1501 20.7332 16.8665 21.4496 16.8665 22.3332V25.5332C16.8665 26.4169 16.1501 27.1332 15.2665 27.1332H12.0665C11.1828 27.1332 10.4665 26.4169 10.4665 25.5332V22.3332Z" stroke="currentColor" stroke-width="1.33333"/>
                            <path d="M20.0665 22.3332C20.0665 21.4496 20.7828 20.7332 21.6665 20.7332H24.8665C25.7501 20.7332 26.4665 21.4496 26.4665 22.3332V25.5332C26.4665 26.4169 25.7501 27.1332 24.8665 27.1332H21.6665C20.7828 27.1332 20.0665 26.4169 20.0665 25.5332V22.3332Z" stroke="currentColor" stroke-width="1.33333"/>
                        </svg>
                </button> */}
              
                {/*List*/}
                {/* <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl ${viewMode === 'list'? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white" : 'bg-[#F7F7FF] hover:bg-green1 text-black'}`}
                      aria-label="List view"
                    >
                        <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.95997 1.3335H26.1333M8.95997 9.9735H26.1333M8.95997 18.6135H26.1333M2.1333 1.3335V1.35056M2.1333 9.9735V9.99056M2.1333 18.6135V18.6306" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button>
              </div>
            </div>                 
        </div> */}
       
            <div className="w-full px-12 mt-4 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <LoadingOverlay visible={isLoading} message="Đang tải dữ liệu..." />
            {/* list templates */}
              {/* detail template */}
              {templates.map((template, i) => (
                <div  key={i} className="bg-white rounded-3xl max-w-[290px] min-w-[240px] shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                onClick={() => navigate(`/template-detail/${template.templateId}`)}>
                  <div className="relative overflow-hidden">
                    <img
                      src={template.previewImage}
                      alt={template.name}
                      className="w-full h-52  object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      {template.isPremium ? (
                      <span className="px-2 py-2 rounded-full text-sm font-bold shadow-lg bg-green-500 text-white" >
                        ⭐ Nâng cao
                      </span>
                      ): (
                        <span className="px-3 py-1 rounded-full text-sm font-bold shadow-lg bg-white text-gray-800" >
                          Miễn phí
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="backdrop-blur-sm p-2 rounded-full transition-colors bg-white/90 hover:bg-white "
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(template);
                        }}
                      >
                        {template.isFavorite ? (
                          <HeartSolidIcon className={`w-5 h-5 text-red-500`} />
                        ) : (
                          <HeartIcon className={`w-5 h-5 text-gray-400`} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="px-6 py-2">
                    {/* Title và Author */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {template.name}
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
                          {template.job ? template.job : "Khác"}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Notification */}
            <NotificationOverlay
                visible={notification.visible}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
            />
        </div>
    )
}

export default Collection