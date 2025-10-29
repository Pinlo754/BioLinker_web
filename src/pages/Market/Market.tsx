import React, { useEffect, useState } from "react";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import MarketCard from "../TemplateDetail/MarketCard";
import useMarket from "./useMarket";
import { LoadingOverlay } from "../../components/ui/loading";
import NotificationOverlay from "../../components/ui/noti";
import { ChevronDown, Menu } from "lucide-react";
import AsideBar from "../../components/sections/SideBar";

const Market = () => {
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
    handleFavoriteClick,
    loading,
    message,
    setMessage,
  } = useMarket();

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
      <Header />

      {/* Loading & Notification */}
      <LoadingOverlay visible={loading} />
      <NotificationOverlay
        visible={message !== ""}
        message={message}
        onClose={() => setMessage("")}
      />

      <main className="w-full flex justify-center px-4 sm:px-6 lg:px-8 mt-24">
        <div className="w-full flex-1 flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <AsideBar
            categoryOptions={categoryOptions}
            filterTemplates={filterTemplates}
          />

          {/* Main Content */}
          <section className="w-full flex flex-col gap-6">
            {/* Search + Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên template"
                value={searchTerm}
                onChange={(e) => searchTemplates(e.target.value)}
                className="flex-1 md:w-64 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <select
                onChange={(e) => getTemplatesByType(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
              >
                <option value="all">Tất cả</option>
                <option value="free">Miễn phí</option>
                <option value="premium">Trả phí</option>
                <option value="favorite">Yêu thích</option>
              </select>
            </div>

            {/* Grid cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:cursor-pointer">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 font-semibold hover:bg-green-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 font-semibold transition ${
                        currentPage === page
                          ? "bg-green-400 text-white"
                          : "text-gray-700 hover:bg-green-400 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 font-semibold hover:bg-green-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Market;