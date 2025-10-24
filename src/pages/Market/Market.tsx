import React, { useEffect } from 'react'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'
import MarketCard from '../TemplateDetail/MarketCard'
import SideBar from '../../components/sections/SideBar'
import useMarket from './useMarket'


const Market = () => {
  const { allTemplates, currentTemplates, currentPage, totalPages, goToPage, goToNextPage, goToPrevPage, getAllTemplates } = useMarket();

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
      <Header />

      <main className=" w-full flex justify-center">
        <div className=' w-full flex-1  py-6 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 mt-10'>
          {/* Sidebar filter */}
          <div className="hidden lg:block w-64 flex-shrink-0">
          <SideBar />
          </div>

          {/* Main content */}
          <section className="w-full ">
            {/* Search + Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-8">
              <div className="flex items-center gap-2 w-full md:w-auto">
                {/* <button className="lg:hidden bg-white rounded-full px-4 py-2 shadow">
                  Filters
                </button> */}
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="flex-1  md:w-64 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <select className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto">
                  <option>Tất cả</option>
                  <option>Free</option>
                  <option>Premium</option>
                  <option>Yêu thích</option>
                </select>
              </div>
            </div>

            {/* Grid cards */}
            <div className="grid grid-rows-2 sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:cursor-pointer">
              {currentTemplates.map((card, i) => (
                <MarketCard key={i} image={card.previewImage} name={card.name} isPremium={card.isPremium} job={card.job} category={card.category}  />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* Previous button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 font-semibold hover:bg-green-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 font-semibold transition ${
                      currentPage === page
                        ? 'bg-green-400 text-white'
                        : 'text-gray-700 hover:bg-green-400 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next button */}
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
  )
}

export default Market
