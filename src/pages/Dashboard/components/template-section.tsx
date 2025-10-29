import { Button } from "../../../components/ui/button";
import MarketCard from "../../TemplateDetail/MarketCard";
import useMarket from "../../Market/useMarket";
import { useEffect } from "react";

const categories = [
  "All Categories",
  "Art",
  "Celebrities",
  "Gaming",
  "Sport",
  "Music",
  "Crypto",
];
const templates = [
  {
    id: 1,
    name: "Thanh Phong",
    image: "/abstract-colorful-sunset-ocean-painting.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
  {
    id: 2,
    name: "Văn Khoa",
    image: "/rainbow-diagonal-stripes-abstract-art.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
  {
    id: 3,
    name: "Minh Khiêm",
    image: "/fantasy-castle-in-clouds-watercolor.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
  {
    id: 4,
    name: "Huỳnh Duyên",
    image: "/colorful-wavy-abstract-pattern.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
];

export function TemplatesSection() {
  const {
    currentTemplates,
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPrevPage,
    getAllTemplates,
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
  } = useMarket();

  useEffect(() => {
    getAllTemplates();
  }, []);
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center lg:text-left">
          Templates
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentTemplates.map((card, i) => (
            <MarketCard
              key={i}
              templateId={card.templateId}
              image={card.previewImage}
              isFavorite={card.isFavorite}
              name={card.name}
              isPremium={card.isPremium}
              job={card.job}
              category={card.category}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-10 sm:px-12"
            onClick={() => (window.location.href = "/marketplace")}
          >
            Xem nhiều hơn
          </Button>
        </div>
      </div>
    </section>
  );
}
