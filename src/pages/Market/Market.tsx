import React from 'react'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'
import MarketCard from '../TemplateDetail/MarketCard'
import SideBar from '../../components/sections/SideBar'
import template1 from '../../assets/template1.jpeg'
import template2 from '../../assets/template2.jpg'
import template3 from '../../assets/template3.jpg'
import template4 from '../../assets/template4.jpg'

const cards = [
  { image: template1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  { image: template2, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  { image: template3, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  { image: template4, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  { image: template1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  { image: template2, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  { image: template3, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  { image: template4, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
]

const Market = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 mt-10">
        
        {/* Sidebar filter */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <SideBar />
        </div>

        {/* Main content */}
        <section className="flex-1">
          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-8">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button className="lg:hidden bg-white rounded-full px-4 py-2 shadow">
                Filters
              </button>
              <input
                type="text"
                placeholder="Search"
                className="flex-1 md:w-64 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <select className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto">
                <option>Recently received</option>
                <option>Most popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
              <MarketCard key={i} {...card} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-700 font-semibold hover:bg-green-400 hover:text-white transition"
              >
                {n}
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Market
